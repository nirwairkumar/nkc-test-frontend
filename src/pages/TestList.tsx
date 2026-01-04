import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchTests } from '@/integrations/api';
import { 
  Clock, ArrowRight, Loader2, Search, 
  PlusCircle, Sparkles, Hash
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import YouTubeGenerator from '@/components/YouTubeGenerator';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import TestLikeButton from '@/components/TestLikeButton';
import TestSettingsPanel from '@/components/TestSettingsPanel';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

export default function TestList() {
    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [configuringTest, setConfiguringTest] = useState<any>(null);

    const specificTestData = [
        { 
            title: "JAM 2025 Biotechnology (BT)", 
            q: 60, m: 180, id: "#M-936218", 
            creator: "TestoZa", category: "IIT JAM",
            // Reference the generated image path here
            bgImage: "/Gemini_Generated_Image_3zerim3zerim3zer.png" 
        },
        { title: "Evolution and Architecture of GPT Models", q: 10, m: 10, id: "#YT-936217", creator: "Nirwair Chaudhary", category: "AI" },
        { title: "Breadth-First Search (BFS) and Depth-First Search (DFS) Algorithms", q: 10, m: 10, id: "#YT-936216", creator: "Deeksha G", category: "Algorithms" },
        { title: "Exam Strategy: Managing Mental Fatigue in CSAT", q: 10, m: 10, id: "#YT-936215", creator: "Joseph George", category: "CSAT" },
        { title: "JEE-Mains 3rd April shift 2", q: 75, m: 180, id: "#M-936212", creator: "Satyam College of Engineering", category: "JEE" },
        { title: "JEE-Mains 2025 4th April Shift 1", q: 75, m: 180, id: "#M-936210", creator: "Satyam College of Engineering", category: "JEE" },
        { title: "SSC CGL Tier-I – 12th September 2025 Shift-1 (Solved Paper)", q: 100, m: 60, id: "#M-936207", creator: "TestoZa", category: "SSC" },
        { title: "JEE Main 2025 – 22 January Shift 1 (MathonGo Solved Paper)", q: 75, m: 180, id: "#M-936206", creator: "Nirwair Chaudhary", category: "JEE-Mains" },
        { title: "BPSC General Science Preparation Strategy: Strategy & Resources", q: 12, m: 18, id: "#YT-350308", creator: "TestoZa", category: "BPSC" },
        { title: "Roscosmos Reality 2025: Russia's Space Program History", q: 12, m: 18, id: "#YT-936196", creator: "TestoZa", category: "Space" },
        { title: "Is AI Making People Dumber? The Impact on Cognitive Abilities", q: 10, m: 15, id: "#YT-612217", creator: "Nirwair Chaudhary", category: "AI" },
        { title: "India's Week in Review: Social, Political, Trends", q: 10, m: 15, id: "#YT-770125", creator: "TestoZa", category: "Current Affairs" },
        { title: "BPSC AEDO 2025 Maths Marathon", q: 47, m: 47, id: "#nkc110", creator: "TC Creator", category: "Maths" },
        { title: "High Level Mathematics – JEE / CAT / GATE", q: 8, m: 8, id: "#nkc4043", creator: "TC Creator", category: "Maths" },
        { title: "Modern History – 71st BPSC Pre", q: 102, m: 30, id: "#nkca104", creator: "TC Creator", category: "History" },
        { title: "General Science", q: 4, m: 4, id: "#example-data", creator: "TC Creator", category: "Science" },
        { title: "Basic Mathematics", q: 8, m: 6, id: "#example-data", creator: "TC Creator", category: "Maths" },
        { title: "IndiGo Crisis 2025 & FDTL Rules", q: 10, m: 30, id: "#nkca103", creator: "TC Creator", category: "GK" },
        { title: "Indian Constitution – Core Concepts", q: 10, m: 30, id: "#nkca102", creator: "TC Creator", category: "Civics" },
        { title: "Indian Constitution – UTs & Panchayats", q: 10, m: 30, id: "#nkca101", creator: "TC Creator", category: "Civics" }
    ];

    useEffect(() => { loadData(); }, []);

    async function loadData() {
        try {
            setLoading(true);
            const { data: testsData } = await fetchTests();
            const transformed = (testsData || []).map((test, index) => {
                const info = specificTestData[index % specificTestData.length];
                return {
                    ...test,
                    title: info.title,
                    displayDuration: info.m,
                    displayQCount: info.q,
                    displayId: info.id,
                    displayCreator: info.creator,
                    displayCategory: info.category,
                    bgImage: info.bgImage // Add the image property
                };
            });
            setTests(transformed);
        } catch (err) {
            console.error('Failed to load data', err);
        } finally {
            setLoading(false);
        }
    }

    const filteredTests = tests.filter(test => 
        test.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#f0f9ff]">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen relative bg-[#f8fafc] overflow-hidden pb-20 font-sans">
            <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-blue-200/30 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-200/30 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 pt-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="h-4 w-4 text-blue-600" />
                            <span className="text-blue-700 font-bold text-xs uppercase tracking-widest">Assessment Portal</span>
                        </div>
                        <h1 className="text-6xl font-black text-slate-800 tracking-tight">Available Tests</h1>
                    </div>
                    <div className="relative w-full md:w-[400px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input 
                            placeholder="Search tests..." 
                            className="rounded-2xl bg-white/60 backdrop-blur-xl border-none h-16 pl-12 shadow-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-14">
                    <YouTubeGenerator onTestGenerated={loadData} />
                </div>
                
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredTests.map((test) => (
                            <motion.div key={test.id} variants={itemVariants} whileHover={{ y: -10 }} layout>
                                <Card 
                                    className="group relative h-[450px] bg-white/40 backdrop-blur-xl border-white/80 rounded-[32px] shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col"
                                    style={{
                                        backgroundImage: test.bgImage ? `url(${test.bgImage})` : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    {/* Overlay to ensure text readability on background images */}
                                    {test.bgImage && <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] group-hover:bg-white/40 transition-colors" />}
                                    
                                    <div className="relative z-10 flex flex-col h-full">
                                        <CardHeader className="p-8 pb-4">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50/80 px-2 py-1 rounded-md w-fit">
                                                        {test.displayCategory}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-slate-500 text-xs font-mono">
                                                        <Hash className="h-3 w-3" />
                                                        {test.displayId}
                                                    </div>
                                                </div>
                                                <TestLikeButton testId={test.id} userId={user?.id} />
                                            </div>
                                            <CardTitle className="text-xl font-bold line-clamp-2 text-slate-900 group-hover:text-blue-700 transition-colors">
                                                {test.title}
                                            </CardTitle>
                                        </CardHeader>

                                        <CardContent className="p-8 pt-0 flex-1 flex flex-col justify-between">
                                            <div className="flex items-center gap-6 text-sm font-bold text-slate-700">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-blue-600" />
                                                    {test.displayDuration}m
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <PlusCircle className="h-4 w-4 text-blue-600" />
                                                    {test.displayQCount} Qs
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/80 border border-white/50 w-fit">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback className="bg-blue-600 text-white text-[10px] leading-none">{test.displayCreator.substring(0,2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-[10px] font-bold uppercase text-slate-700">
                                                    {test.displayCreator}
                                                </span>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="p-8 pt-0">
                                            <Button 
                                                className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-black text-lg shadow-xl"
                                                onClick={() => navigate(`/test-intro/${test.id}`)}
                                            >
                                                Open
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </CardFooter>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {configuringTest && (
                <TestSettingsPanel test={configuringTest} onClose={() => setConfiguringTest(null)} onUpdate={loadData} />
            )}
        </div>
    );
}