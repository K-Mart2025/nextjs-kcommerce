import { initMixpanel } from "@/lib/mixpanel";
import { useEffect } from "react";

export default function MixpanelInit() {
  useEffect(() => { initMixpanel(); }, []);
  return null;
}