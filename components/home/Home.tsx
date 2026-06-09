import { createClient } from "@/utils/supabase/client";
import { DefaultHomepage } from "./HomeTemplate";

export default async function HomeTemplate() {
  const supabase = await createClient();

  const { data: sections } = await supabase
    .from("homepage_sections")
    .select("*")
    .eq("enabled", true)
    .order("sort_order");

  return <DefaultHomepage sections={sections || []} />;
}
