import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Social } from "./social";
import { BackButton } from "./back-button";
import { Header } from "./header";

interface cardWrapperProps{
    children:React.ReactNode;
    headerLabel:String;
    backButtonLabel:String;
    backButtonHref:String;
    showSocial?:boolean
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocial
}:cardWrapperProps) => {
  return (
  <Card className="w-[400px] shadow-md">
    <CardHeader>
        <Header label={headerLabel}/>
    </CardHeader>
    <CardContent>
         {children}
    </CardContent>
    {
        showSocial && 
       ( <CardFooter>
            <Social/>
        </CardFooter>)
    }
    <CardFooter>
        <BackButton
            label={backButtonLabel}
            href={backButtonHref}
        />
    </CardFooter>

  </Card>
  )
}
