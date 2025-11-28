import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export const DatePicker = ({
  selectedElement = null,
  onChange,
  mode = "single",
}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [range, setRange] = useState(null);
  const selected = mode === "single" ? date : range;
  const renderText = () => {
    if (mode === "range" && selectedElement) {
      return `${selectedElement.from.toLocaleDateString()} - ${selectedElement.to.toLocaleDateString()}`;
    }
    if (mode === "single" && date) {
      return date.toLocaleDateString();
    }
    if (mode === "range" && range) {
      return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`;
    }

    return "Select range";
  };

  const handleSelect = (selected) => {
    if (!selected) return;

    if (mode === "single") {
      setDate(selected);
      onChange?.(selected);
      setOpen(false);
      return;
    }

    if (mode === "range") {
      setRange(selected);
      if (selected?.from && selected?.to) {
        onChange?.(selected);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {renderText()}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode={mode}
            selected={selectedElement}
            captionLayout="dropdown"
            onSelect={handleSelect}
            required={false}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
