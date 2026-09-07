import Footer from "@/components/base/footer/footer";
import Header from "@/components/base/header/header";

export default function WithNavLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}