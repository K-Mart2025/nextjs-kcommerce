import { Product } from "@/types/product"
import { Tag } from "lucide-react"
import { SectionHeader } from "../../../components/views/SectionHeader"
import SpecialSectionProducts from "../SpecialSectionProducts"

export const SpecialSection = ({title, subtitle, data}: {title: string, subtitle: string, data: Product[]}) => {
    return <section className="mb-20 w-full max-w-7xl">
        <SectionHeader
            title={title}
            subtitle={subtitle}
            icon={<Tag size={24} className="text-blue-900" />}
        />
        <SpecialSectionProducts data={data} />
    </section>
}