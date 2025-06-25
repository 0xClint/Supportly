"use client";
import React, { useRef, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn, generateEmbedIframe } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { hashEmail } from "@/lib/db/user";
import { useUserData } from "@/context/UserContext";
import { Copy, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { v4 as uuid } from "uuid";

// Dummy model data
const dummyModelData = [
  {
    id: "model-1",
    name: "GPT-4.1",
    provider: "OpenAI",
    description: "OpenAI's advanced model",
  },
  {
    id: "model-2",
    name: "Gemini 2.5 Pro 06-05",
    provider: "Google",
    description: "Google's latest model",
    badge: "new",
  },
  {
    id: "model-3",
    name: "Grok 3 Beta",
    provider: "xAI",
    description: "xAI's latest model",
  },
  {
    id: "model-4",
    name: "R1 1776",
    provider: "Perplexity",
    description: "Perplexity’s unbiased reasoning model",
  },
  {
    id: "model-5",
    name: "o3",
    provider: "OpenAI",
    description: "OpenAI’s most powerful reasoning model",
    selected: true,
  },
  {
    id: "model-6",
    name: "Claude 4.0 Sonnet Thinking",
    provider: "Anthropic",
    description: "Anthropic’s reasoning model",
  },
];

// Zod schema for validation
const formSchema = z.object({
  projectName: z.string().min(1), // project name
  logoImage: z.any(), // logo file
  model: z.string(), // selected model
  file: z.any(), // document file
  website: z.string().optional(), // website link
});

export default function CreateService({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [embedCode, setEmbedCode] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const { userId } = useUserData();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: "--",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      console.log(values);

      // //FileData-Upload
      // const fileForm = new FormData();
      // fileForm.set("file", values.file);
      // const fileUploadRes = await fetch("/api/upload-file", {
      //   method: "POST",
      //   body: fileForm,
      // });
      // const data_url = await fileUploadRes.json();

      // //LogoImg-Upload
      // const logoForm = new FormData();
      // logoForm.set("file", values.logoImage);
      // const logoUploadRes = await fetch("/api/upload-file", {
      //   method: "POST",
      //   body: logoForm,
      // });
      // const logo_url = await logoUploadRes.json();

      const data_url = "data_url";
      const logo_url = "logo_url";
      const project_id = uuid();
      const embedded_url = generateEmbedIframe(
        process.env.NEXT_PUBLIC_PAYMENT_MEDIATER_ENDPOINT!,
        userId,
        project_id
      );
      setEmbedCode(embedded_url);
      try {
        await fetch("/api/add-project", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            name: values.projectName,
            logo_url,
            model: values.model,
            data_url,
            website_url: values.website,
            project_id,
            embedded_url,
          }),
        });
        await new Promise((res) => setTimeout(res, 2000));

        setOpen(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <>
      <div className="flex flex-1 flex-col items-center gap-4 py-4 px-20 pt-0">
        <div
          className={cn(
            "relative w-[700px] flex flex-col gap-6 my-5 overflow-hidden"
          )}
        >
          {isLoading && (
            <div className="absolute flex justify-center items-center w-full h-full bg-[#03071291]">
              <LoaderCircle className="animate-spin" />
            </div>
          )}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Create Support Chatbot</CardTitle>
              <CardDescription>
                Fill all fields to create your chatbot
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Project Name */}
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter project name..."
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Logo File Upload */}
                  <FormField
                    control={form.control}
                    name="logoImage"
                    render={({ field: { onChange, ref } }) => (
                      <FormItem className="w-50">
                        <FormLabel>Logo Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            onChange={(e) => onChange(e.target.files?.[0])}
                            ref={ref}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Select Model */}
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Model</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {dummyModelData.map(({ id, name }) => (
                              <SelectItem value={id} key={id}>
                                {name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Document Upload */}
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { onChange, ref } }) => (
                      <FormItem className="w-50">
                        <FormLabel>Upload Document</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".txt"
                            required
                            onChange={(e) => onChange(e.target.files?.[0])}
                            ref={ref}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Website Link */}
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website Link</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com"
                            type="url"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
              Open Dialog
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[425px]"
            showCloseButton={false}
            preventOutsideClose={true}
          >
            <DialogHeader>
              <DialogTitle>Project created Succesffully</DialogTitle>
              <DialogDescription>
                Copy this link and paste in your website site
              </DialogDescription>
            </DialogHeader>
            <div className="relative grid gap-4">
              <span className="absolute bottom-3 right-3">
                <Button
                  variant="secondary"
                  className="size-7 cursor-pointer"
                  onClick={async () =>
                    await navigator.clipboard.writeText(embedCode)
                  }
                >
                  <Copy className="h-[14px]" />
                </Button>
              </span>
              <Card
                className={cn(
                  "p-3 pb-7 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex  w-full rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                )}
              >
                <pre className="whitespace-pre-wrap break-all">{embedCode}</pre>
              </Card>
            </div>
            <DialogFooter>
              <Button onClick={() => router.push("/dashboard")}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
