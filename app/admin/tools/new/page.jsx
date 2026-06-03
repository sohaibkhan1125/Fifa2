"use client";

import ToolForm from "@/components/admin/ToolForm";
import { emptyTool } from "@/lib/schemas";

export default function NewToolPage() {
  return <ToolForm initial={emptyTool()} isEdit={false} />;
}
