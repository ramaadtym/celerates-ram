import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface FormValues {
  name: string;
}

interface IComboBoxProps {
  control?: any;
  value: string;
  onSelect: (value: string) => void;
}

const ComboBox: React.FunctionComponent<IComboBoxProps> = ({
  onSelect,
  control,
}) => {
  const layoutOpt = [
    { id: 1, label: "Layout 1", value: "layout1" },
    { id: 2, label: "Layout 2", value: "layout2" },
  ] as const;

  return (
    <section id="combobox">
      <FormField
        control={control}
        name="layout"
        render={({ field }) => {
          return (
            <FormItem className="flex flex-col">
              <FormLabel>Choose Layout</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? layoutOpt.find((opt) => opt.value === field.value)
                            ?.label
                        : "Select Layout"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {layoutOpt.map((layout) => (
                          <CommandItem
                            value={layout.value}
                            key={layout.value}
                            onSelect={onSelect}
                          >
                            {layout.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                layout.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          );
        }}
      />
    </section>
  );
};

export default ComboBox;
