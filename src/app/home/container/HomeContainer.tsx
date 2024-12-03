import { Button } from "@/shared/container/ui/button"

const HomeContainer = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <p>HomeContainer</p>
            <div className="flex items-center gap-4 mt-4">
                <Button
                    size={"lg"}
                >
                    Primary
                </Button>
                <Button
                    size={"lg"}
                    variant={"secondary"}
                >
                    Secondary
                </Button>
            </div>
        </div>
    )
}

export default HomeContainer