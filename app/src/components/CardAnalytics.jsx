import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

export const CardAnalytics = ({
  title,
  value,
  description,
  isLoading,
  children,
}) => {
  if (isLoading) {
    return (
      <Card className="border-none shadow-md rounded-2xl p-4">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-6 w-full mt-2" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-md rounded-2xl p-4 flex flex-col gap-3">
      <CardHeader className="p-0">
        <CardTitle className="text-sm font-medium text-slate-500">
          {title}
        </CardTitle>

        <CardDescription className="text-3xl font-semibold text-slate-900 mt-1">
          {value ?? "—"}
        </CardDescription>

        {description && (
          <p className="text-xs text-slate-400 mt-1">{description}</p>
        )}
      </CardHeader>

      {children && (
        <CardContent className="p-0 pt-2 text-sm text-slate-500">
          {children}
        </CardContent>
      )}
    </Card>
  );
};
