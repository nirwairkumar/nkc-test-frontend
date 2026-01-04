import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchTests, fetchSections, fetchTestSections, fetchTestsByUserId } from '@/integrations/api';
import type { MockTest as Test } from '@/data/mockTests'; 
import { Clock, ArrowRight, Loader2, Search, Share2, ChevronRight, ChevronLeft, RefreshCw, Settings, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import YouTubeGenerator from '@/components/YouTubeGenerator';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

import TestLikeButton from '@/components/TestLikeButton';
import TestSettingsPanel from '@/components/TestSettingsPanel';

// --- Sub-component: Section Tag Scroller ---
function TestCardSectionList({ sectionIds, allSections }: { sectionIds: string[] | undefined, allSections: any[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [showLeftArrow, setShowLeftArrow] = useState(false);

    const sections = useMemo(() => 
        (sectionIds || []).map(id => allSections.find(s => s.id === id)).filter(Boolean),
        [sectionIds, allSections]
    );

    const checkOverflow = () => {
        if (scrollRef.current) {
            const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
            setShowRightArrow(scrollWidth > clientWidth && Math.ceil(scrollLeft + clientWidth) < scrollWidth);
            setShowLeftArrow(scrollLeft > 0);
        }
    };

    useEffect(() => {
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [sections]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const amount = 100;
            scrollRef.current.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
            setTimeout(checkOverflow, 300);
        }
    };

    if (sections.length === 0) return null;

    return (
        <div className="flex-1 min-w-0 relative group flex items-center justify-end">
            {showLeftArrow && (
                <div className="absolute left-0 z-10 h-full flex items-center bg-gradient-to-r from-white to-transparent pr-2">
                    <button onClick={(e) => { e.stopPropagation(); scroll('left'); }} className="h-5 w-5 flex items-center justify-center hover:text-primary transition-colors">
                        <ChevronLeft className="h-4 w-4 text-slate-500" />
                    </button>
                </div>
            )}
            <div
                ref={scrollRef}
                onScroll={checkOverflow}
                className="flex items-center gap-1 overflow-x-auto scrollbar-hide max-w-full px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {sections.map((sec: any) => (
                    <span key={sec.id} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 whitespace-nowrap shrink-0">
                        {sec.name}
                    </span>
                ))}
            </div>
            {showRightArrow && (
                <div className="absolute right-0 z-10 h-full flex items-center bg-gradient-to-l from-white to-transparent pl-2">
                    <button onClick={(e) => { e.stopPropagation(); scroll('right'); }} className="h-5 w-5 flex items-center justify-center hover:text-primary transition-colors">
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                    </button>
                </div>
            )}
        </div>
    );
}

// --- Main Page Component ---
export default function TestList() {
    const [tests, setTests] = useState<Test[]>([]);
    const [sections, setSections] = useState<any[]>([]);
    const [testSectionMap, setTestSectionMap] = useState<Record<string, string[]>>({});
    const [userTests, setUserTests] = useState<Test[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [configuringTest, setConfiguringTest] = useState<any>(null);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const navigate = useNavigate();
    const { user } = useAuth();
    const placeholders = ["Search by Title...", "Search by ID...", "Search by Name..."];

    // Custom Styles
    const customBrown = "text-[#7f1d1d]"; 
    const openButtonClass = "bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-400 text-white border-none shadow-md transition-all duration-300";

    useEffect(() => {
        loadData();
        const interval = setInterval(() => setPlaceholderIndex(p => (p + 1) % placeholders.length), 3000);
        return () => clearInterval(interval);
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            const [tData, sData, mData] = await Promise.all([fetchTests(), fetchSections(), fetchTestSections()]);
            
            const map: Record<string, string[]> = {};
            mData.data?.forEach((m: any) => {
                if (!map[m.test_id]) map[m.test_id] = [];
                map[m.test_id].push(m.section_id);
            });

            setTests(tData.data as any || []);
            setSections(sData.data || []);
            setTestSectionMap(map);
            if (user) loadUserTests();
        } catch (err) {
            toast.error("Failed to load tests");
        } finally {
            setLoading(false);
        }
    }

    async function loadUserTests() {
        if (!user) return;
        const { data } = await fetchTestsByUserId(user.id);
        if (data) setUserTests((data as any[]).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    }

    const filteredTests = useMemo(() => tests.filter(test => {
        const query = searchQuery.toLowerCase();
        return !searchQuery || 
            test.title.toLowerCase().includes(query) || 
            test.custom_id?.toLowerCase().includes(query) ||
            test.creator_name?.toLowerCase().includes(query);
    }), [searchQuery, tests]);

    const handleShare = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        navigator.clipboard.writeText(`${window.location.origin}/test-intro/${id}`);
        toast.success("Link copied!");
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-blue-50/50">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
    );

    return (
        <div className="min-h-screen bg-blue-50/50 pb-12">
            <div className="container mx-auto py-8 px-4 max-w-7xl">
                {/* Top Header */}
                <div className="flex flex-col mb-8 gap-4">
                    <div className="flex items-center justify-between">
                        <div>
                           <h1 className="text-3xl font-bold text-black">Available Tests</h1>
                            <p className="text-slate-500 mt-1 font-medium">Select a test to begin your practice</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={loadData} className="bg-white border-blue-200 text-blue-700">
                            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                        </Button>
                    </div>
                    <YouTubeGenerator onTestGenerated={loadData} />
                </div>

                {/* Recent Tests Section */}
                {userTests.length > 0 && (
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h2 className={`text-xl font-bold ${customBrown}`}>Your Recent Tests</h2>
                            <Button variant="ghost" className="text-blue-600 hover:bg-blue-100/50" onClick={() => navigate('/my-tests')}>
                                View All <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userTests.slice(0, 3).map((test) => (
                                <Card key={test.id} className="flex flex-col bg-white border-blue-100 shadow-sm">
                                    <CardHeader className="p-4 pb-2">
                                        <CardTitle className={`text-lg font-bold ${customBrown} line-clamp-2`}>{test.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-between">
                                        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                                            <span className="flex items-center"><Clock className="mr-1 h-3.5 w-3.5" /> {test.questions?.length || 0} Qs • {test.duration || 30}m</span>
                                            {test.custom_id && <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">#{test.custom_id}</span>}
                                        </div>
                                        <div className="flex items-center justify-between h-8">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6"><AvatarImage src={test.creator_avatar}/></Avatar>
                                                <span className="text-xs font-semibold text-slate-600">{test.creator_name}</span>
                                            </div>
                                            <TestCardSectionList sectionIds={testSectionMap[test.id]} allSections={sections} />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0 flex gap-2">
                                        <TestLikeButton testId={test.id} userId={user?.id} />
                                        <Button size="sm" className={`flex-1 ${openButtonClass}`} onClick={() => navigate(`/test-intro/${test.id}`)}>
                                            Open <ArrowRight className="ml-2 h-3 w-3" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Explorer Bar */}
<div className="flex items-center justify-between bg-white border border-blue-100 rounded-xl p-4 mb-8 shadow-sm">
    {/* Changed to h2, size to text-2xl, and ensured text-black */}
    <h2 className="text-2xl font-bold text-black px-2">Explore Tests</h2>
    
    <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
        <Input
            placeholder={placeholders[placeholderIndex]}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-blue-50/30 border-blue-50"
        />
    </div>
</div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTests.map((test) => (
                        <Card key={test.id} className="flex flex-col bg-white border-blue-100 hover:shadow-md transition-all relative overflow-hidden group">
                            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/90 shadow-sm" onClick={(e) => handleShare(e, test.id)}>
                                    <Share2 className="h-4 w-4 text-blue-600" />
                                </Button>
                            </div>
                            <CardHeader className="p-4 pb-2">
                                <CardTitle className={`text-lg font-bold leading-tight line-clamp-2 min-h-[3rem] ${customBrown}`}>
                                    {test.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-between">
                                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                                    <span className="flex items-center"><Clock className="mr-1.5 h-3.5 w-3.5" /> {test.questions?.length || 0} Qs • {test.duration || 30}m</span>
                                    {test.custom_id && <span className="bg-slate-50 px-2 py-0.5 rounded border">#{test.custom_id}</span>}
                                </div>
                                <div className="flex items-center justify-between gap-2 h-8">
                                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/creator/${test.created_by}`)}>
                                        <Avatar className="h-6 w-6"><AvatarImage src={test.creator_avatar}/></Avatar>
                                        <span className="text-xs font-semibold text-slate-600 truncate max-w-[80px]">{test.creator_name}</span>
                                    </div>
                                    <TestCardSectionList sectionIds={testSectionMap[test.id]} allSections={sections} />
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex items-center gap-2">
                                <div className="scale-90 origin-left"><TestLikeButton testId={test.id} userId={user?.id} /></div>
                                <div className="flex-1 flex gap-2">
                                    {user?.id === test.created_by && (
                                        <>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setConfiguringTest(test)}><Settings className="h-4 w-4" /></Button>
                                            <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => navigate(`/edit-test/${test.id}`)}><Edit className="h-4 w-4" /></Button>
                                        </>
                                    )}
                                    <Button size="sm" className={`flex-1 h-8 ${openButtonClass}`} onClick={() => navigate(`/test-intro/${test.id}`)}>
                                        Open <ArrowRight className="ml-1.5 h-3 w-3" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {filteredTests.length === 0 && (
                    <div className="text-center py-20 text-slate-400">No tests found matching your criteria.</div>
                )}
            </div>

            {configuringTest && (
                <TestSettingsPanel
                    test={configuringTest}
                    onClose={() => setConfiguringTest(null)}
                    onUpdate={loadData}
                    onViewResults={() => { setConfiguringTest(null); navigate('/my-tests'); }}
                />
            )}
        </div>
    );
}