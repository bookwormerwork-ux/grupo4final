import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Compass, MapPin, School, Trees, Users, Sparkles } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { LOCATIONS } from "@/data/locations";

interface CommandPaletteProps {
  onJumpToMap: () => void;
  onJumpToCredits: () => void;
  onJumpToHero: () => void;
}

/**
 * Raycast-style command palette. Press ⌘K (or Ctrl+K) to open.
 * Lets users instantly jump to a section, open a location detail page,
 * or trigger common actions.
 */
const CommandPalette = ({
  onJumpToMap,
  onJumpToCredits,
  onJumpToHero,
}: CommandPaletteProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    // Defer slightly so the dialog can finish closing animation
    setTimeout(fn, 80);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Busca una ubicación, sección o acción…" />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>

        <CommandGroup heading="Navegación">
          <CommandItem onSelect={() => run(onJumpToHero)}>
            <Sparkles className="mr-2 h-4 w-4 text-park-green" />
            Ir al inicio
            <CommandShortcut>G H</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => run(onJumpToMap)}>
            <Compass className="mr-2 h-4 w-4 text-park-green" />
            Ir al mapa
            <CommandShortcut>G M</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => run(onJumpToCredits)}>
            <Users className="mr-2 h-4 w-4 text-accent-amber" />
            Ver créditos
            <CommandShortcut>G C</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Ubicaciones">
          {LOCATIONS.map((loc) => {
            const Icon = loc.type === "school" ? School : Trees;
            return (
              <CommandItem
                key={loc.id}
                value={`${loc.name} ${loc.type}`}
                onSelect={() =>
                  run(() => navigate(`/detail/${loc.id}`))
                }
              >
                <Icon
                  className="mr-2 h-4 w-4"
                  style={{ color: loc.borderColor }}
                />
                {loc.name}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Acciones">
          <CommandItem
            onSelect={() =>
              run(() => {
                navigator.clipboard.writeText(window.location.href).catch(() => {});
              })
            }
          >
            <MapPin className="mr-2 h-4 w-4 text-neutral-500" />
            Copiar enlace de la página
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
