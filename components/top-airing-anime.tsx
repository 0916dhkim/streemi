"use client";
import { CONSUMET_API_URL } from "@/lib/constants";
import { Data, EpisodeResult } from "@/lib/types";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

export default function TopAiringAnime() {
  const url = CONSUMET_API_URL + "anime/gogoanime/top-airing";

  console.log(process.env.CONSUMET_API_URL);

  const [data, setData] = useState<Data[]>([]);
  const [results, setResults] = useState<EpisodeResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setResults(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [url, data]);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl mt-4">Top Airing Anime</h1>
      <div className="pt-2 flex flex-wrap w-full h-full mx-auto">
        {results.map((result, index) => (
          <Card className="w-[250px] m-2 " key={result.id}>
            <CardHeader>
              <CardDescription className="text-lg">{index + 1}</CardDescription>
              <CardTitle>{result.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={result.image}
                alt={result.title}
                width={250}
                height={350}
              />
            </CardContent>
            <CardFooter>
              <Link href={result.url}>
                <Button>Watch Now</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}