import { MapPin } from "lucide-react"

const MapSection = () => {
    return (
        <div className="relative">
            <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-w-16 aspect-h-12">
                    <div className="w-full h-96 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                        <div className="relative w-full h-full overflow-hidden">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d568.3771496745661!2d-82.38319833246334!3d23.136183237098653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88cd79003abf7731%3A0xcd6035615bbd2b00!2sK-Mart!5e0!3m2!1ses-419!2scu!4v1759553149408!5m2!1ses-419!2scu"
                                className="absolute !w-full !h-full top-0 left-0 border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
                <div className="flex items-center space-x-2 text-red-600 font-semibold">
                    <MapPin size={16} />
                    <span>K-Mart</span>
                </div>
            </div>
        </div>
    )
}
export default MapSection