"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ToolForm from "@/components/admin/ToolForm";
import { getToolById } from "@/lib/toolsRepository";

export default function EditToolPage() {
  const params = useParams();
  const router = useRouter();
  const [tool, setTool] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const found = getToolById(params.id);
    if (!found) {
      router.push("/admin/tools");
      return;
    }
    // Ensure the tool has the seo shape
    setTool({
      ...found,
      seo: found.seo || { metaTitle: "", metaDescription: "", sections: [], faqs: [], relatedIds: [] },
      config: found.config || {},
    });
  }, [params.id, router]);

  if (!mounted || !tool) {
    return <div className="py-20 text-center text-sm text-[var(--color-text-muted)]">Loading…</div>;
  }

  return <ToolForm initial={tool} isEdit={true} />;
}
