import { HomepageSection } from "@/hooks/useHomePageTemplates";
import { createClient } from "@/utils/supabase/client";
import { DefaultHomepage } from "./HomeTemplate";

export default async function HomeTemplate() {
  const supabase = await createClient();

  // 1. Fetch the active homepage template ID
  const { data: activeTemplate } = await supabase
    .from("homepage_templates")
    .select("id")
    .eq("is_active", true)
    .maybeSingle();

  // 2. Fetch enabled sections belonging to the active template
  let query = supabase
    .from("homepage_sections")
    .select("*")
    .eq("enabled", true);

  if (activeTemplate?.id) {
    query = query.eq("template_id", activeTemplate.id);
  }

  const { data: sections } = await query.order("sort_order");

  return (
    <DefaultHomepage
      sections={(sections as unknown as HomepageSection[]) || []}
    />
  );
}
