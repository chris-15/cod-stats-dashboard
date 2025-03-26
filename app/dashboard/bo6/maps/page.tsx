import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const modeMaps = [
  {
    name: "Hardpoint",
    maps: [
      {
        name: "Hacienda",
        image:
          "https://wgcm16ax0j.ufs.sh/f/g0j2nElFVrusYyZ3GrhtHb9e2i87Pusv0rZx31OLg4XyAGSj",
      },
      {
        name: "Protocol",
        image:
          "https://wgcm16ax0j.ufs.sh/f/g0j2nElFVrus3IgdaTi2joUwC64J7Lnl0XfixFOIkh3dmpuc",
      },
      {
        name: "RedCard",
        image:
          "https://wgcm16ax0j.ufs.sh/f/g0j2nElFVrusYQgmLrtHb9e2i87Pusv0rZx31OLg4XyAGSjz",
      },
      {
        name: "Skyline",
        image:
          "https://wgcm16ax0j.ufs.sh/f/g0j2nElFVrusEb1klXg0NnxvXFrikqRCeWpPI29K5UtoQ6ST",
      },
      {
        name: "Vault",
        image:
          "https://wgcm16ax0j.ufs.sh/f/g0j2nElFVrusDg24ocw9EvFXp1BoCS9OZlPnTKQyGYuDm28q",
      },
    ],
  },
  {
    name: "Control",
    maps: [
      {
        name: "Hacienda",
        image:
          "https://wgcm16ax0j.ufs.sh/f/g0j2nElFVrusEX18TC0NnxvXFrikqRCeWpPI29K5UtoQ6STg",
      },
      {
        name: "Protocol",
        image:
          "https://wgcm16ax0j.ufs.sh/f/g0j2nElFVrusSO2sGGmAIjMfHX2rCVvJwsPhgxWnGNlDm8ZQ",
      },
      {
        name: "Vault",
        image:
          "https://wgcm16ax0j.ufs.sh/f/g0j2nElFVrusl7BaMvTv4NcXE3wFjT1gHVZSQz59oOrnG2Pa",
      },
    ],
  },
  {
    name: "Search & Destroy",
    maps: [
      {
        name: "Dealership",
        image:
          "https://wgcm16ax0j.ufs.sh/f/g0j2nElFVrus1i8NXyZRSWEGnwOC84mAracyhf0DPH3BLqpM",
      },
      {
        name: "Hacienda",
        image:
          "https://wgcm16ax0j.ufs.sh/f/g0j2nElFVrus0FKMvNz5Z8fBGkQco2sDWlxtN3nhbVi4L1jM",
      },
      {
        name: "Protocol",
        image:
          "https://wgcm16ax0j.ufs.sh/f/g0j2nElFVrusAXzYQ5IIfw2k3ePJTuOV6Eq0ANzgdbrZlMYS",
      },
      {
        name: "RedCard",
        image:
          "https://wgcm16ax0j.ufs.sh/f/g0j2nElFVrust88YcMnCFDGv2wNe8aP6WIhocysld9TLg1EZ",
      },
      {
        name: "Rewind",
        image:
          "https://wgcm16ax0j.ufs.sh/f/g0j2nElFVrus6s3E3CF1JfivOugClteEqmWn4hp5xIdPQ3kb",
      },
    ],
  },
];

function page() {
  return (
    <div className="">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-6 ">
        Map Objective Points
      </h1>
      <Tabs defaultValue="Hardpoint" className="w-full max-w-6xl mx-auto">
        <TabsList className="grid grid-cols-3 mb-4">
          {modeMaps.map((mode) => (
            <TabsTrigger value={mode.name} key={mode.name}>
              {mode.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {modeMaps.map((mode) => (
          <TabsContent key={mode.name} value={mode.name} className="">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mode.maps.map((tacMap) => (
                <Card key={tacMap.name}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg md:text-xl font-medium tracking-tight border-b pb-2 mb-2">
                      {tacMap.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-square">
                      <Image
                        fill
                        src={tacMap.image}
                        alt={tacMap.name}
                        className="rounded-md object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
export default page;
