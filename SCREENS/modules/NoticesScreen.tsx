"use client";

import * as React from "react";
import { Plus, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/DataTable";
import { SearchBar } from "../components/SearchBar";
import { FormModal } from "../components/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotices } from "../hooks/useNotices";
import { Notice } from "@/lib/api/notices";

interface NoticeFormState {
  titleEn: string;
  titleHi: string;
  contentEn: string;
  contentHi: string;
  published: boolean;
  isPinned: boolean;
}

const defaultForm: NoticeFormState = {
  titleEn: "",
  titleHi: "",
  contentEn: "",
  contentHi: "",
  published: true,
  isPinned: false,
};

export function NoticesScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data, isLoading: loading, createNotice, updateNotice, deleteNotice, isMutating } = useNotices({
    search: searchQuery,
    page: 1,
    limit: 50
  });
  const notices = data?.data || [];
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingNoticeId, setEditingNoticeId] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<NoticeFormState>(defaultForm);

  const editingNotice = React.useMemo(
    () => notices.find((item) => item.id === editingNoticeId) ?? null,
    [editingNoticeId, notices],
  );

  React.useEffect(() => {
    if (!editingNotice) {
      setFormData(defaultForm);
      return;
    }

    setFormData({
      titleEn: editingNotice.titleEn,
      titleHi: editingNotice.titleHi || "",
      contentEn: editingNotice.contentEn ?? "",
      contentHi: editingNotice.contentHi ?? "",
      published: editingNotice.published,
      isPinned: editingNotice.isPinned,
    });
  }, [editingNotice]);

  const columns = [
    { header: "Notice Title (EN)", accessor: "titleEn" as const },
    { 
      header: "Date", 
      accessor: (n: Notice) => new Date(n.createdAt).toLocaleDateString()
    },
    { 
      header: "Status", 
      accessor: (n: Notice) => (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${
          n.published ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-700"
        }`}>
          {n.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
          {n.published ? "Published" : "Draft"}
        </span>
      )
    },
  ];

  const handleModalClose = React.useCallback(() => {
    setIsModalOpen(false);
    setEditingNoticeId(null);
    setFormData(defaultForm);
  }, []);

  const handleSaveNotice = React.useCallback(async () => {
    if (!formData.titleEn.trim()) return;

    if (editingNotice) {
      await updateNotice({ id: editingNotice.id, data: formData });
    } else {
      await createNotice(formData);
    }

    handleModalClose();
  }, [editingNotice, formData, handleModalClose, updateNotice, createNotice]);

  const actions = [
    {
      label: "Edit Notice",
      onClick: (n: Notice) => {
        setEditingNoticeId(n.id);
        setIsModalOpen(true);
      },
    },
    {
      label: "Delete",
      variant: "destructive" as const,
      onClick: async (n: Notice) => {
        if (confirm("Delete this notice?")) {
          await deleteNotice(n.id);
        }
      },
    },
  ];

  const isSubmitting = isMutating;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communication Center</h1>
          <p className="text-sm text-gray-500">Post announcements and important notices for parents and staff.</p>
        </div>
        <Button
          className="h-10 bg-indigo-600 hover:bg-indigo-700"
          onClick={() => {
            setEditingNoticeId(null);
            setFormData(defaultForm);
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Notice
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between">
        <SearchBar onSearch={setSearchQuery} placeholder="Search notices..." />
      </div>


      <DataTable
        data={notices}
        columns={columns}
        actions={actions}
        isLoading={loading}
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingNotice ? "Update Notice" : "Create New Notice"}
        description="Write your announcement in English and Hindi to ensure reach."
        submitLabel={editingNotice ? "Update Notice" : "Publish Notice"}
        onSubmit={() => {
          void handleSaveNotice();
        }}
        isSubmitting={isSubmitting}
      >
        <Tabs defaultValue="english" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="english">English Content</TabsTrigger>
            <TabsTrigger value="hindi">Hindi (हिंदी)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="english" className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Notice Title</Label>
              <Input
                placeholder="Enter title in English"
                value={formData.titleEn}
                onChange={(event) => setFormData((prev) => ({ ...prev, titleEn: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <textarea 
                className="w-full h-32 p-3 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-transparent"
                placeholder="Write the notice body here..."
                value={formData.contentEn}
                onChange={(event) => setFormData((prev) => ({ ...prev, contentEn: event.target.value }))}
              />
            </div>
          </TabsContent>

          <TabsContent value="hindi" className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>सूचना का शीर्षक</Label>
              <Input
                placeholder="हिंदी में शीर्षक दर्ज करें"
                value={formData.titleHi}
                onChange={(event) => setFormData((prev) => ({ ...prev, titleHi: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>विषय सामग्री</Label>
              <textarea 
                className="w-full h-32 p-3 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-transparent font-hindi"
                placeholder="यहाँ सूचना का विवरण लिखें..."
                value={formData.contentHi}
                onChange={(event) => setFormData((prev) => ({ ...prev, contentHi: event.target.value }))}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-4 border-t space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Pin to Top</Label>
              <p className="text-xs text-gray-500">Highlight this notice on the homepage dashboard.</p>
            </div>
            <Switch
              checked={formData.isPinned}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPinned: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Public Visibility</Label>
              <p className="text-xs text-gray-500">Make this notice visible to parents and visitors immediately.</p>
            </div>
            <Switch
              checked={formData.published}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, published: checked }))}
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
