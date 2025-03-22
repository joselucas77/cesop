"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Services } from "@prisma/client";

interface SetServiceProps {
  selectedService: Services | null;
  setSelectedService: (service: Services | null) => void;
}

export function SetService({
  selectedService,
  setSelectedService,
}: SetServiceProps) {
  const [services, setServices] = React.useState<Services[]>([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const fetchServices = async () => {
      const services = await fetch("/api/services");
      const servicesData = await services.json();
      setServices(servicesData);
    };
    fetchServices();
  }, []);

  React.useEffect(() => {
    if (selectedService) {
      setValue(selectedService.name);
    }
  }, [selectedService]);

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="max-w-52">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between">
            {value
              ? services.find((service) => service.name === value)?.name
              : "Selecione o serviço"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Pesquise o serviço..." className="h-9" />
            <CommandList>
              <CommandEmpty>Nenhum serviço encontrado.</CommandEmpty>
              <CommandGroup>
                {services.map((service) => (
                  <CommandItem
                    key={service.id}
                    value={service.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      setSelectedService(service);
                    }}>
                    {service.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === service.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedService ? (
        <p className="text-sm text-muted-foreground">
          {selectedService?.description}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">Descrição do serviço..</p>
      )}
    </div>
  );
}
