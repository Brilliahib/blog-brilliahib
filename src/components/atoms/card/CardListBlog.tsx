"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog } from "@/types/blog/blog";
import { buildFromAppURL } from "@/utils/misc";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

interface CardListBlogProps {
  data?: Blog[];
  isLoading?: boolean;
}

function CardListBlogSkeleton() {
  return (
    <Card className="overflow-hidden pt-0">
      <Skeleton className="w-full h-48 rounded-t-xl pt-0" />
      <CardContent className="space-y-2">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-6 w-full rounded-md" />
        <Skeleton className="h-6 w-3/4 rounded-md" />
      </CardContent>
    </Card>
  );
}

export default function CardListBlog({ data, isLoading }: CardListBlogProps) {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardListBlogSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
      {data?.map((blog) => (
        <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block">
          <Card className="pt-0">
            <CardHeader className="px-0 relative">
              <div className="relative w-full h-48">
                <Image
                  src={buildFromAppURL(blog.image)}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-black/20 rounded-t-xl transition-colors duration-300 ease-in-out group-hover:bg-black/30" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                <Badge className="border-primary/50 bg-primary/10 text-primary rounded-full">
                  {blog.category.name}
                </Badge>
                <h1 className="font-semibold line-clamp-2">{blog.title}</h1>
                <div className="font-medium text-sm text-muted-foreground">
                  {format(new Date(blog.created_at), "dd MMM yyyy", {
                    locale: id,
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
