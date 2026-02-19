"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateKnowledge } from "@/hooks/use-knowledge";
import { Loader2, Plus } from "lucide-react";

const schema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  content: z.string().min(5, "Content must be at least 5 characters").max(2000),
});

type FormData = z.infer<typeof schema>;

export function KnowledgeForm() {
  const { mutate: createKnowledge, isPending } = useCreateKnowledge();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    createKnowledge(data, { onSuccess: () => reset() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Input
          {...register("title")}
          placeholder="Title (e.g. Pricing)"
          className="h-9"
        />
        {errors.title && (
          <p className="text-destructive text-xs mt-1">
            {errors.title.message}
          </p>
        )}
      </div>
      <div>
        <Textarea
          {...register("content")}
          placeholder="Content (e.g. Plans start from ₹999/month.)"
          rows={3}
          className="resize-none text-sm"
        />
        {errors.content && (
          <p className="text-destructive text-xs mt-1">
            {errors.content.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        size="sm"
        className="w-full gap-2"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Plus className="h-3.5 w-3.5" />
        )}
        Add to Knowledge Base
      </Button>
    </form>
  );
}
