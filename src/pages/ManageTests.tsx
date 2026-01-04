import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { BackButton } from '@/components/ui/BackButton';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchTests, assignSectionsToTest, fetchSections, updateSection, deleteSection, createSection, Section } from '@/integrations/api';
import { Trash2, Settings, Plus, Pencil, Upload, Clock, Share2, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ManageTests() {
    const { loading: authLoading, isAdmin } = useAuth();
    const navigate = useNavigate();

    // --- State ---
    const [activeTab, setActiveTab] = useState("tests");
    const [tests, setTests] = useState<any[]>([]);
    const [testsLoading, setTestsLoading] = useState(true);
    const [isTestEditOpen, setIsTestEditOpen] = useState(false);
    const [editingTest, setEditingTest] = useState<any>(null);
    const [selectedSectionsForTest, setSelectedSectionsForTest] = useState<string[]>([]);
    const [sections, setSections] = useState<Section[]>([]);
    const [sectionsLoading, setSectionsLoading] = useState(true);
    const [isSectionDialogOpen, setIsSectionDialogOpen] = useState(false);
    const [editingSection, setEditingSection] = useState<{ id?: string, name: string }>({ name: '' });

    useEffect(() => {
        if (!authLoading && !isAdmin) {
            navigate('/admin-login');
        }
    }, [authLoading, isAdmin, navigate]);

    useEffect(() => {
        loadTests();
        loadSections();
    }, []);

    const loadTests = async () => {
        setTestsLoading(true);
        try {
            const { data, error } = await fetchTests();
            if (error) throw error;
            setTests(data || []);
        } catch (error) {
            toast.error("Failed to load tests");
        } finally {
            setTestsLoading(false);
        }
    };

    const loadSections = async () => {
        setSectionsLoading(true);
        const { data } = await fetchSections();
        if (data) setSections(data);
        setSectionsLoading(false);
    };

    const handleDeleteTest = async (testId: string, testTitle: string) => {
        if (!confirm(`Are you sure you want to delete "${testTitle}"?`)) return;
        try {
            const { deleteTest } = await import('@/integrations/api');
            const { error } = await deleteTest(testId);
            if (error) throw error;
            setTests(prev => prev.filter(t => t.id !== testId));
            toast.success(`Test deleted`);
        } catch (error: any) {
            toast.error('Failed to delete: ' + error.message);
        }
    };

    const handleSaveTest = async () => {
        if (!editingTest) return;
        try {
            const { updateTest } = await import('@/integrations/api');
            const { error } = await updateTest(editingTest.id, {
                title: editingTest.title,
                description: editingTest.description,
                custom_id: editingTest.custom_id,
                duration: parseFloat(editingTest.duration)
            });
            if (error) throw error;
            await assignSectionsToTest(editingTest.id, selectedSectionsForTest);
            toast.success("Test updated");
            setIsTestEditOpen(false);
            loadTests();
        } catch (error: any) {
            toast.error("Error: " + error.message);
        }
    };

    const handleSaveSection = async () => {
        if (!editingSection.name.trim()) return;
        try {
            if (editingSection.id) {
                await updateSection(editingSection.id, editingSection.name.trim());
            } else {
                await createSection(editingSection.name.trim());
            }
            setIsSectionDialogOpen(false);
            loadSections();
            toast.success("Section saved");
        } catch (error) {
            toast.error("Failed to save section");
        }
    };

    const handleDeleteSection = async (section: Section) => {
        if (!confirm(`Delete section "${section.name}"?`)) return;
        try {
            await deleteSection(section.id);
            loadSections();
            toast.success("Section deleted");
        } catch (error) {
            toast.error("Failed to delete section");
        }
    }

    // New solid blue class for the "Manage" button
    const actionButtonClass = "bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg h-9 font-semibold text-sm transition-all";

    if (authLoading) return <div className="p-10 text-center">Checking permissions...</div>;
    if (!isAdmin) return null;

    return (
        <div className="container mx-auto max-w-6xl py-10 space-y-6">
            <BackButton />
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                    <p className="text-slate-500">Manage tests and master data.</p>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-[400px] grid-cols-2 mb-8 bg-slate-100 p-1">
                    <TabsTrigger value="tests">Manage Tests</TabsTrigger>
                    <TabsTrigger value="sections">Manage Sections</TabsTrigger>
                </TabsList>

                {/* --- TESTS TAB --- */}
                <TabsContent value="tests" className="space-y-6">
                    <div className="flex justify-end">
                        <Button variant="outline" onClick={loadTests} size="sm" className="rounded-full">
                            Refresh Tests
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testsLoading ? (
                            <div className="col-span-full text-center py-20">Loading tests...</div>
                        ) : tests.length === 0 ? (
                            <div className="col-span-full text-center py-20 border-2 border-dashed rounded-xl">No tests found.</div>
                        ) : (
                            tests.map(test => (
                                <Card key={test.id} className="flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                                    <CardHeader className="p-4 pb-2">
                                        <div className="flex justify-between items-start gap-2">
                                            <CardTitle className="text-base font-bold text-[#7f1d1d] leading-snug line-clamp-2 min-h-[2.5rem]">
                                                {test.title}
                                            </CardTitle>
                                            <div className="flex shrink-0">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400" onClick={() => navigate(`/edit-test/${test.id}`)}>
                                                    <Settings className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/60" onClick={() => handleDeleteTest(test.id, test.title)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="p-4 pt-0 flex-1 flex flex-col">
                                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-4">
                                            <div className="flex items-center gap-3 font-medium">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" /> {test.questions?.length || 0} Qs • {test.duration || 0}m
                                                </span>
                                            </div>
                                            <span className="font-mono text-[10px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 uppercase">
                                                {test.custom_id || 'ID-NONE'}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-7 w-7 border border-slate-100">
                                                    <AvatarFallback className="bg-blue-100 text-blue-700 text-[10px] font-bold">
                                                        {(test.displayCreator || 'AD').substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-xs font-semibold text-slate-600 truncate max-w-[80px]">
                                                    {test.displayCreator || 'Admin'}
                                                </span>
                                            </div>

                                            {/* Tag badges as seen in images */}
                                            <div className="flex flex-wrap justify-end gap-1">
                                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider">
                                                    {test.category || 'TEST'}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="p-4 pt-2">
                                        <Button 
                                            className={`w-full ${actionButtonClass}`}
                                            onClick={() => navigate(`/edit-test/${test.id}`)}
                                        >
                                            Manage <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        )}
                    </div>
                </TabsContent>

                {/* --- SECTIONS TAB --- */}
                <TabsContent value="sections">
                    <Card className="border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <div>
                                <CardTitle>Test Sections</CardTitle>
                                <CardDescription>Global categories (e.g., JEE, NEET, Math).</CardDescription>
                            </div>
                            <Button onClick={() => setIsSectionDialogOpen(true)} size="sm" className={actionButtonClass}>
                                <Plus className="w-4 h-4 mr-2" /> Add Section
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50">
                                        <TableHead>Section Name</TableHead>
                                        <TableHead className="w-[100px] text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sections.map(section => (
                                        <TableRow key={section.id}>
                                            <TableCell className="font-semibold text-slate-700">{section.name}</TableCell>
                                            <TableCell className="text-right flex justify-end gap-1">
                                                <Button variant="ghost" size="icon" onClick={() => { setEditingSection(section); setIsSectionDialogOpen(true); }}>
                                                    <Pencil className="w-4 h-4 text-blue-600" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDeleteSection(section)}>
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* SECTION DIALOG */}
            <Dialog open={isSectionDialogOpen} onOpenChange={setIsSectionDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editingSection.id ? 'Edit Section' : 'Add Section'}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input 
                                value={editingSection.name} 
                                onChange={(e) => setEditingSection({...editingSection, name: e.target.value})}
                                placeholder="e.g. JEE Mains"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsSectionDialogOpen(false)}>Cancel</Button>
                        <Button className={actionButtonClass} onClick={handleSaveSection}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}