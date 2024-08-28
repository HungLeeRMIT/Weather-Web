import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "lucide-react";
import StatisticCard from "@/components/StatisticCard";
import { useCountryPopulation, usePopulation } from "@/hooks/usePopulation";
import { useState } from "react";
import RankingView from "@/components/RankingView";
import { TypographyH1 } from "@/components/ui/typography/h1";
import { useMeta } from "@/hooks/useMeta";
import PopulationTable from "@/components/PopulationTable";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
};



export default function Home() {
  const {data} = usePopulation()

  const [selectedCountry, setSelectedCountry] = useState("");

  const handleChangeCountry = (value: string) => {
setSelectedCountry(value)
  }

  const {data: meta, isFetching} = useMeta()
  const {data: worldPopulations} = useCountryPopulation("WLD");

  return (
    <main
      className={cn(
        "bg-background font-sans antialiased p-3",
        fontSans.variable
      )}
    >
      <div className="flex p-10 place-content-center w-full h-56">
        <TypographyH1>Weather Application</TypographyH1>
      </div>

      <div className="mb-3 flex gap-3 place-content-center">
        {isFetching ? (
          <div>Loading</div>
        ) : (
          <>
            <StatisticCard
              title="Number of country"
              number={meta?.totalCountry ?? 0}
            />
            <StatisticCard
              title="Number of city"
              number={meta?.totalCity ?? 0}
            />
            <StatisticCard
              title="Number of state"
              number={meta?.totalState ?? 0}
            />
          </>
        )}
      </div>
      <div className="flex gap-3">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div>Global Population Overview</div>
              {/* <div className="flex gap-3 my-3">
                <CountrySelect onValueChange={handleChangeCountry} />
                <CitySelect countryId={selectedCountry} />
                <StateSelect countryId={selectedCountry} />
              </div> */}
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <PopulationTable data={worldPopulations ?? []} asChart />
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader>Team Member</CardHeader>
          <CardContent>
            <TeamMember />
          </CardContent>
        </Card> */}
      </div>

      <div className="mt-3">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div>Global Country Population Ranking</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <RankingView />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}