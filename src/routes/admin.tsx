import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  Copy,
  Eye,
  FileJson,
  GitBranch,
  Image,
  Layers,
  LayoutDashboard,
  MapPinned,
  MousePointer2,
  Plus,
  RotateCcw,
  Save,
  Search,
  Settings,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import {
  applySectionTextToScope,
  importCmsSnapshot,
  replaceMediaEverywhere,
  resetCmsSnapshot,
  saveCmsSnapshot,
  updateCmsSnapshot,
  useCmsSnapshot,
} from "@/lib/cms/store";
import type {
  CmsDigitalTwin,
  CmsLocationPage,
  CmsPage,
  CmsProperty,
  CmsSection,
  CmsSnapshot,
  CmsTwinComponent,
  CmsTwinMicroComponent,
  CmsTwinPage,
  CmsTwinSection,
} from "@/lib/cms/types";
import { flattenTwinMicros } from "@/lib/cms/digital-twin";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "MyRoomiee Enterprise CMS" },
      {
        name: "description",
        content: "Section-based CMS for MyRoomiee pages, properties, locations, SEO and media.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminCms,
});

type AdminTab =
  | "dashboard"
  | "pages"
  | "locations"
  | "properties"
  | "digital-twin"
  | "inheritance"
  | "apply-all"
  | "seo"
  | "media"
  | "leads"
  | "settings"
  | "preview"
  | "coverage";

const tabs: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "pages", label: "Home / Pages", icon: Layers },
  { id: "locations", label: "Locations", icon: MapPinned },
  { id: "properties", label: "Properties", icon: FileJson },
  { id: "digital-twin", label: "Digital Twin", icon: MousePointer2 },
  { id: "inheritance", label: "Inheritance", icon: GitBranch },
  { id: "apply-all", label: "Apply To All", icon: BadgeCheck },
  { id: "seo", label: "SEO Manager", icon: Search },
  { id: "media", label: "Media Library", icon: Image },
  { id: "leads", label: "Leads", icon: Users },
  { id: "settings", label: "Global Settings", icon: Settings },
  { id: "preview", label: "Live Preview", icon: Eye },
  { id: "coverage", label: "Coverage", icon: BadgeCheck },
];

const fallbackImage =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'%3E%3Crect width='800' height='500' fill='%23eff6ff'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' font-family='Arial' font-size='34' fill='%231d4ed8'%3EMyRoomiee Media%3C/text%3E%3C/svg%3E";

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const readImages = async (files: FileList | null) => {
  const selected = Array.from(files ?? []).filter((file) => file.type.startsWith("image/"));
  return Promise.all(selected.map(readFileAsDataUrl));
};

const registerUploadedMedia = (images: string[], usage: string) => {
  if (images.length === 0) return;
  updateCmsSnapshot((draft) => {
    images.forEach((url) => {
      if (draft.media.some((asset) => asset.url === url)) return;
      draft.media.unshift({
        id: `media-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: "Uploaded image",
        url,
        alt: "Uploaded MyRoomiee image",
        usage: [usage],
        tags: ["uploaded"],
      });
    });
    return draft;
  });
};

const moveArrayItem = <T,>(items: T[], index: number, direction: -1 | 1) => {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= items.length) return items;
  const next = [...items];
  [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
  return next;
};

function AdminCms() {
  const snapshot = useCmsSnapshot();
  const [active, setActive] = useState<AdminTab>("dashboard");
  const [selectedPageId, setSelectedPageId] = useState("home");
  const [selectedLocationSlug, setSelectedLocationSlug] = useState("pg-in-malad-east");
  const [selectedPropertySlug, setSelectedPropertySlug] = useState(
    snapshot.properties[0]?.slug ?? "",
  );
  const [selectedTwinPageId, setSelectedTwinPageId] = useState("home");
  const [previewUrl, setPreviewUrl] = useState("/");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const selectedPage = snapshot.pages[selectedPageId] ?? Object.values(snapshot.pages)[0];
  const selectedLocation =
    snapshot.locationPages[selectedLocationSlug] ?? Object.values(snapshot.locationPages)[0];
  const selectedProperty =
    snapshot.properties.find((property) => property.slug === selectedPropertySlug) ??
    snapshot.properties[0];

  return (
    <main className="admin-shell min-h-screen bg-[color:var(--surface)]">
      <div className="border-b border-border bg-card/95 shadow-soft backdrop-blur">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-3 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-lg font-black text-primary-foreground">
              M
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                MyRoomiee
              </p>
              <h1 className="truncate font-display text-2xl font-bold">Enterprise CMS</h1>
            </div>
          </div>
          <div className="hidden flex-wrap gap-2 lg:flex">
            {tabs.slice(0, 5).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={cn(
                  "rounded-full border px-3 py-2 text-xs font-bold transition sm:text-sm",
                  active === tab.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1800px] gap-4 px-3 py-4 sm:px-5 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-6">
        <aside className="rounded-2xl border border-border bg-card p-3 shadow-soft lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-auto">
          <div className="hidden px-3 py-3 lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Workspace
            </p>
            <h2 className="mt-1 font-display text-lg font-bold">Admin Tools</h2>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-1 lg:mt-2 lg:grid lg:gap-1 lg:overflow-visible lg:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition lg:w-full",
                    active === tab.id
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="mt-4 hidden rounded-xl bg-muted/50 p-3 text-xs leading-5 text-muted-foreground lg:block">
            Fallback protection is active. Public pages keep original content if CMS data is
            missing.
          </div>
        </aside>

        <section className="min-w-0">
          <AdminHeader snapshot={snapshot} />
          {active === "dashboard" && <Dashboard snapshot={snapshot} setActive={setActive} />}
          {active === "pages" && (
            <PageEditor
              snapshot={snapshot}
              selectedPage={selectedPage}
              selectedPageId={selectedPageId}
              setSelectedPageId={setSelectedPageId}
            />
          )}
          {active === "locations" && (
            <LocationEditor
              snapshot={snapshot}
              selectedLocation={selectedLocation}
              selectedLocationSlug={selectedLocationSlug}
              setSelectedLocationSlug={setSelectedLocationSlug}
            />
          )}
          {active === "properties" && (
            <PropertyEditor
              snapshot={snapshot}
              selectedProperty={selectedProperty}
              selectedPropertySlug={selectedPropertySlug}
              setSelectedPropertySlug={setSelectedPropertySlug}
            />
          )}
          {active === "digital-twin" && (
            <DigitalTwinEditor
              snapshot={snapshot}
              selectedPageId={selectedTwinPageId}
              setSelectedPageId={setSelectedTwinPageId}
            />
          )}
          {active === "inheritance" && <InheritanceManager snapshot={snapshot} />}
          {active === "apply-all" && <ApplyToAllCenter snapshot={snapshot} />}
          {active === "seo" && <SeoManager snapshot={snapshot} />}
          {active === "media" && <MediaLibrary snapshot={snapshot} />}
          {active === "leads" && <LeadManager snapshot={snapshot} />}
          {active === "settings" && <GlobalSettings snapshot={snapshot} />}
          {active === "preview" && (
            <LivePreview
              snapshot={snapshot}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
              previewDevice={previewDevice}
              setPreviewDevice={setPreviewDevice}
            />
          )}
          {active === "coverage" && <CoverageGate snapshot={snapshot} />}
        </section>
      </div>
    </main>
  );
}

function AdminHeader({ snapshot }: { snapshot: CmsSnapshot }) {
  const importRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(false);

  const saveWebsite = () => {
    saveCmsSnapshot(snapshot);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  const exportSnapshot = () => {
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `myroomiee-cms-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importFile = async (file: File | undefined) => {
    if (!file) return;
    const text = await file.text();
    importCmsSnapshot(JSON.parse(text) as Partial<CmsSnapshot>);
  };

  return (
    <div className="mb-6 rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Section based editor
          </p>
          <h2 className="font-display text-2xl font-bold">Manage every page without code</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Last saved {snapshot.updatedAt.replace("T", " ").slice(0, 16)} UTC
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={importRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(event) => void importFile(event.currentTarget.files?.[0])}
          />
          <button className="cms-btn-primary" type="button" onClick={saveWebsite}>
            <Save className="h-4 w-4" /> {saved ? "Saved" : "Save Changes"}
          </button>
          <button className="cms-btn" type="button" onClick={() => importRef.current?.click()}>
            <Upload className="h-4 w-4" /> Import
          </button>
          <button className="cms-btn" type="button" onClick={exportSnapshot}>
            <FileJson className="h-4 w-4" /> Export
          </button>
          <button className="cms-btn-danger" type="button" onClick={resetCmsSnapshot}>
            <RotateCcw className="h-4 w-4" /> Reset to defaults
          </button>
        </div>
      </div>
    </div>
  );
}

function Dashboard({
  snapshot,
  setActive,
}: {
  snapshot: CmsSnapshot;
  setActive: (tab: AdminTab) => void;
}) {
  const stats = [
    { label: "Editable Pages", value: Object.keys(snapshot.pages).length },
    { label: "Location Pages", value: Object.keys(snapshot.locationPages).length },
    { label: "Properties", value: snapshot.properties.length },
    { label: "Media Assets", value: snapshot.media.length },
    { label: "Leads", value: snapshot.leads.length },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tabs
          .filter((tab) => tab.id !== "dashboard")
          .map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className="rounded-2xl border border-border bg-card p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <tab.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-display text-lg font-bold">{tab.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Edit CMS data with fallback protection and publish-safe defaults.
              </p>
            </button>
          ))}
      </div>
    </div>
  );
}

function DigitalTwinEditor({
  snapshot,
  selectedPageId,
  setSelectedPageId,
}: {
  snapshot: CmsSnapshot;
  selectedPageId: string;
  setSelectedPageId: (id: string) => void;
}) {
  const selectedPage =
    snapshot.digitalTwin.pages[selectedPageId] ?? Object.values(snapshot.digitalTwin.pages)[0];
  const [selectedSectionId, setSelectedSectionId] = useState(selectedPage?.sections[0]?.id ?? "");
  const selectedSection =
    selectedPage?.sections.find((sectionItem) => sectionItem.id === selectedSectionId) ??
    selectedPage?.sections[0];
  const [selectedComponentId, setSelectedComponentId] = useState(
    selectedSection?.components[0]?.id ?? "",
  );
  const selectedComponent =
    selectedSection?.components.find((component) => component.id === selectedComponentId) ??
    selectedSection?.components[0];
  const [selectedMicroId, setSelectedMicroId] = useState(
    selectedComponent?.microComponents[0]?.id ?? "",
  );
  const selectedMicro =
    selectedComponent?.microComponents.find((micro) => micro.id === selectedMicroId) ??
    selectedComponent?.microComponents[0];

  const selectPage = (id: string) => {
    const page = snapshot.digitalTwin.pages[id];
    setSelectedPageId(id);
    const firstSection = page?.sections[0];
    const firstComponent = firstSection?.components[0];
    setSelectedSectionId(firstSection?.id ?? "");
    setSelectedComponentId(firstComponent?.id ?? "");
    setSelectedMicroId(firstComponent?.microComponents[0]?.id ?? "");
  };

  const updatePage = (updater: (page: CmsTwinPage) => void) => {
    updateCmsSnapshot((draft) => {
      const page = draft.digitalTwin.pages[selectedPage.id];
      if (page) updater(page);
      return draft;
    });
  };

  const updateSection = (sectionId: string, patch: Partial<CmsTwinSection>) =>
    updatePage((page) => {
      page.sections = page.sections.map((sectionItem) =>
        sectionItem.id === sectionId ? { ...sectionItem, ...patch } : sectionItem,
      );
    });

  const updateComponent = (componentId: string, patch: Partial<CmsTwinComponent>) =>
    updatePage((page) => {
      page.sections = page.sections.map((sectionItem) =>
        sectionItem.id !== selectedSection?.id
          ? sectionItem
          : {
              ...sectionItem,
              components: sectionItem.components.map((component) =>
                component.id === componentId ? { ...component, ...patch } : component,
              ),
            },
      );
    });

  const updateMicro = (microId: string, patch: Partial<CmsTwinMicroComponent>) =>
    updatePage((page) => {
      page.sections = page.sections.map((sectionItem) =>
        sectionItem.id !== selectedSection?.id
          ? sectionItem
          : {
              ...sectionItem,
              components: sectionItem.components.map((component) =>
                component.id !== selectedComponent?.id
                  ? component
                  : {
                      ...component,
                      microComponents: component.microComponents.map((micro) =>
                        micro.id === microId ? { ...micro, ...patch } : micro,
                      ),
                    },
              ),
            },
      );
    });

  const duplicateMicro = () => {
    if (!selectedMicro || !selectedComponent || !selectedSection) return;
    const copy = {
      ...selectedMicro,
      id: `${selectedMicro.id}-copy-${Date.now()}`,
      name: `${selectedMicro.name} Copy`,
      override: true,
      locked: false,
    };
    updatePage((page) => {
      page.sections = page.sections.map((sectionItem) =>
        sectionItem.id !== selectedSection.id
          ? sectionItem
          : {
              ...sectionItem,
              components: sectionItem.components.map((component) =>
                component.id !== selectedComponent.id
                  ? component
                  : { ...component, microComponents: [...component.microComponents, copy] },
              ),
            },
      );
    });
    setSelectedMicroId(copy.id);
  };

  return (
    <EditorShell
      title="Digital Twin Editor"
      sub="Edit the current CMS as Website -> Page -> Section -> Component -> Micro Component."
    >
      <SelectField
        label="Page"
        value={selectedPage?.id ?? ""}
        onChange={selectPage}
        options={Object.values(snapshot.digitalTwin.pages).map((page) => ({
          value: page.id,
          label: `${page.title} (${page.route})`,
        }))}
      />

      <div className="grid gap-4 2xl:grid-cols-[minmax(0,860px)_minmax(420px,1fr)]">
        <div className="grid gap-4 md:grid-cols-3 2xl:sticky 2xl:top-4 2xl:self-start">
          <TwinListPanel
            title="Sections"
            items={(selectedPage?.sections ?? []).map((sectionItem) => ({
              id: sectionItem.id,
              label: sectionItem.name,
              sub: sectionItem.visible ? "Visible" : "Hidden",
              active: selectedSection?.id === sectionItem.id,
            }))}
            onSelect={(id) => {
              const section = selectedPage.sections.find((item) => item.id === id);
              const component = section?.components[0];
              setSelectedSectionId(id);
              setSelectedComponentId(component?.id ?? "");
              setSelectedMicroId(component?.microComponents[0]?.id ?? "");
            }}
            onToggle={
              selectedSection
                ? () => updateSection(selectedSection.id, { visible: !selectedSection.visible })
                : undefined
            }
          />
          <TwinListPanel
            title="Components"
            items={(selectedSection?.components ?? []).map((component) => ({
              id: component.id,
              label: component.name,
              sub: component.type,
              active: selectedComponent?.id === component.id,
            }))}
            onSelect={(id) => {
              const component = selectedSection?.components.find((item) => item.id === id);
              setSelectedComponentId(id);
              setSelectedMicroId(component?.microComponents[0]?.id ?? "");
            }}
            onToggle={
              selectedComponent
                ? () =>
                    updateComponent(selectedComponent.id, { visible: !selectedComponent.visible })
                : undefined
            }
          />
          <TwinListPanel
            title="Micro Features"
            items={(selectedComponent?.microComponents ?? []).map((micro) => ({
              id: micro.id,
              label: micro.name,
              sub: `${micro.type}${micro.locked ? " - locked" : ""}`,
              active: selectedMicro?.id === micro.id,
            }))}
            onSelect={setSelectedMicroId}
            onToggle={
              selectedMicro
                ? () => updateMicro(selectedMicro.id, { visible: !selectedMicro.visible })
                : undefined
            }
          />
        </div>

        {selectedMicro ? (
          <div className="min-w-0 rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  Micro Component
                </p>
                <h3 className="font-display text-xl font-bold">{selectedMicro.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="cms-icon-btn"
                  type="button"
                  title="Duplicate micro component"
                  onClick={duplicateMicro}
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  className="cms-icon-btn"
                  type="button"
                  title={selectedMicro.locked ? "Unlock" : "Lock"}
                  onClick={() => updateMicro(selectedMicro.id, { locked: !selectedMicro.locked })}
                >
                  <GitBranch className="h-4 w-4" />
                </button>
                <button
                  className="cms-icon-btn"
                  type="button"
                  title="Toggle visibility"
                  onClick={() => updateMicro(selectedMicro.id, { visible: !selectedMicro.visible })}
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="Name"
                  value={selectedMicro.name}
                  onChange={(value) => updateMicro(selectedMicro.id, { name: value })}
                />
                <SelectField
                  label="Type"
                  value={selectedMicro.type}
                  onChange={(value) =>
                    updateMicro(selectedMicro.id, { type: value as CmsTwinMicroComponent["type"] })
                  }
                  options={[
                    "text",
                    "image",
                    "icon",
                    "badge",
                    "counter",
                    "cta",
                    "url",
                    "alt",
                    "caption",
                    "overlay",
                    "visibility",
                    "sort-order",
                    "animation",
                    "background",
                    "layout",
                    "json",
                  ].map((value) => ({ value, label: value }))}
                />
              </div>
              <TextareaField
                label="Value / Text"
                value={selectedMicro.value}
                onChange={(value) => updateMicro(selectedMicro.id, { value, override: true })}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="URL / HREF"
                  value={selectedMicro.href ?? ""}
                  onChange={(value) =>
                    updateMicro(selectedMicro.id, { href: value, override: true })
                  }
                />
                <TextField
                  label="Icon"
                  value={selectedMicro.icon ?? ""}
                  onChange={(value) =>
                    updateMicro(selectedMicro.id, { icon: value, override: true })
                  }
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <TextField
                  label="Sort Order"
                  value={String(selectedMicro.sortOrder)}
                  onChange={(value) =>
                    updateMicro(selectedMicro.id, { sortOrder: Number(value) || 0, override: true })
                  }
                />
                <TextField
                  label="Animation"
                  value={selectedMicro.animation ?? ""}
                  onChange={(value) =>
                    updateMicro(selectedMicro.id, { animation: value, override: true })
                  }
                />
                <TextField
                  label="Background"
                  value={selectedMicro.background ?? ""}
                  onChange={(value) =>
                    updateMicro(selectedMicro.id, { background: value, override: true })
                  }
                />
              </div>
              <TextareaField
                label="Layout Controls"
                value={selectedMicro.layout ?? ""}
                onChange={(value) =>
                  updateMicro(selectedMicro.id, { layout: value, override: true })
                }
              />
              <div className="grid gap-4 rounded-2xl border border-border bg-background p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Image Metadata
                </p>
                <TextField
                  label="Image URL"
                  value={selectedMicro.image?.src ?? ""}
                  onChange={(value) =>
                    updateMicro(selectedMicro.id, {
                      image: { ...(selectedMicro.image ?? { alt: "" }), src: value },
                      value: selectedMicro.type === "image" ? value : selectedMicro.value,
                      override: true,
                    })
                  }
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <TextField
                    label="Alt Text"
                    value={selectedMicro.image?.alt ?? ""}
                    onChange={(value) =>
                      updateMicro(selectedMicro.id, {
                        image: { ...(selectedMicro.image ?? { src: "" }), alt: value },
                        override: true,
                      })
                    }
                  />
                  <TextField
                    label="Caption"
                    value={selectedMicro.image?.caption ?? ""}
                    onChange={(value) =>
                      updateMicro(selectedMicro.id, {
                        image: { ...(selectedMicro.image ?? { src: "", alt: "" }), caption: value },
                        override: true,
                      })
                    }
                  />
                  <TextField
                    label="Overlay Text"
                    value={selectedMicro.image?.overlayText ?? ""}
                    onChange={(value) =>
                      updateMicro(selectedMicro.id, {
                        image: {
                          ...(selectedMicro.image ?? { src: "", alt: "" }),
                          overlayText: value,
                        },
                        override: true,
                      })
                    }
                  />
                  <TextField
                    label="Badge"
                    value={selectedMicro.image?.badge ?? ""}
                    onChange={(value) =>
                      updateMicro(selectedMicro.id, {
                        image: { ...(selectedMicro.image ?? { src: "", alt: "" }), badge: value },
                        override: true,
                      })
                    }
                  />
                  <TextField
                    label="Focal Point"
                    value={selectedMicro.image?.focalPoint ?? ""}
                    onChange={(value) =>
                      updateMicro(selectedMicro.id, {
                        image: {
                          ...(selectedMicro.image ?? { src: "", alt: "" }),
                          focalPoint: value,
                        },
                        override: true,
                      })
                    }
                  />
                  <TextField
                    label="Crop"
                    value={selectedMicro.image?.crop ?? ""}
                    onChange={(value) =>
                      updateMicro(selectedMicro.id, {
                        image: { ...(selectedMicro.image ?? { src: "", alt: "" }), crop: value },
                        override: true,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={selectedMicro.visible}
                    onChange={(event) =>
                      updateMicro(selectedMicro.id, { visible: event.currentTarget.checked })
                    }
                  />
                  Visible
                </label>
                <label className="flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={Boolean(selectedMicro.override)}
                    onChange={(event) =>
                      updateMicro(selectedMicro.id, { override: event.currentTarget.checked })
                    }
                  />
                  Override
                </label>
                <label className="flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={Boolean(selectedMicro.locked)}
                    onChange={(event) =>
                      updateMicro(selectedMicro.id, { locked: event.currentTarget.checked })
                    }
                  />
                  Locked
                </label>
              </div>
              <div className="rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
                Parent value: {selectedMicro.inheritedFrom || "None"} | Fallback:{" "}
                {selectedMicro.fallbackValue || "None"}
              </div>
            </div>
          </div>
        ) : (
          <EmptyState text="Select a micro component to edit." />
        )}
      </div>
    </EditorShell>
  );
}

function TwinListPanel({
  title,
  items,
  onSelect,
  onToggle,
}: {
  title: string;
  items: { id: string; label: string; sub: string; active: boolean }[];
  onSelect: (id: string) => void;
  onToggle?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-soft">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold">{title}</h3>
        {onToggle ? (
          <button className="cms-icon-btn" type="button" onClick={onToggle}>
            <Eye className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      <div className="grid max-h-[22rem] gap-2 overflow-auto pr-1 2xl:max-h-[calc(100vh-19rem)]">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={cn(
              "rounded-xl border p-3 text-left transition",
              item.active
                ? "border-primary bg-primary/10"
                : "border-border bg-background hover:bg-accent",
            )}
          >
            <span className="line-clamp-1 text-sm font-semibold">{item.label}</span>
            <span className="mt-1 block line-clamp-1 text-xs text-muted-foreground">
              {item.sub}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function InheritanceManager({ snapshot }: { snapshot: CmsSnapshot }) {
  const subAreas = Object.values(snapshot.locationPages).filter(
    (page) => page.pageType === "sub-area",
  );
  const [slug, setSlug] = useState(subAreas[0]?.slug ?? "");
  const selected = snapshot.locationPages[slug] ?? subAreas[0];
  const parent = selected?.parentSlug ? snapshot.locationPages[selected.parentSlug] : undefined;
  const page = selected ? snapshot.digitalTwin.pages[`location:${selected.slug}`] : undefined;
  const parentPage = parent ? snapshot.digitalTwin.pages[`location:${parent.slug}`] : undefined;

  const resetToParent = () => {
    if (!page || !parentPage) return;
    updateCmsSnapshot((draft) => {
      const target = draft.digitalTwin.pages[page.id];
      const source = draft.digitalTwin.pages[parentPage.id];
      if (!target || !source) return draft;
      target.sections = target.sections.map((sectionItem) => ({
        ...sectionItem,
        components: sectionItem.components.map((component) => ({
          ...component,
          microComponents: component.microComponents.map((micro) => {
            const parentMicro = source.sections
              .find((parentSection) => parentSection.id === sectionItem.id)
              ?.components.find((parentComponent) => parentComponent.id === component.id)
              ?.microComponents.find((parentCandidate) => parentCandidate.id === micro.id);
            return parentMicro && !micro.locked
              ? {
                  ...micro,
                  value: parentMicro.value,
                  href: parentMicro.href,
                  icon: parentMicro.icon,
                  image: parentMicro.image,
                  inheritedFrom: source.id,
                  override: false,
                }
              : micro;
          }),
        })),
      }));
      return draft;
    });
  };

  const setAllLocks = (locked: boolean) => {
    if (!page) return;
    updateCmsSnapshot((draft) => {
      const target = draft.digitalTwin.pages[page.id];
      if (!target) return draft;
      target.sections = target.sections.map((sectionItem) => ({
        ...sectionItem,
        components: sectionItem.components.map((component) => ({
          ...component,
          microComponents: component.microComponents.map((micro) => ({ ...micro, locked })),
        })),
      }));
      return draft;
    });
  };

  const inheritedCount = page
    ? flattenTwinMicros({ pages: { [page.id]: page } }).filter((item) => item.micro.inheritedFrom)
        .length
    : 0;
  const overrideCount = page
    ? flattenTwinMicros({ pages: { [page.id]: page } }).filter((item) => item.micro.override).length
    : 0;

  return (
    <EditorShell
      title="Inheritance Manager"
      sub="Manage Global -> Main Area -> Sub Area inheritance using the existing location engine."
    >
      <SelectField
        label="Sub Area"
        value={selected?.slug ?? ""}
        onChange={setSlug}
        options={subAreas.map((pageItem) => ({
          value: pageItem.slug,
          label: `${pageItem.data.area} -> ${pageItem.parentArea}`,
        }))}
      />
      {selected ? (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Parent
            </p>
            <h3 className="mt-2 font-display text-xl font-bold">{parent?.data.area ?? "None"}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {selected.data.area} inherits default gallery, rooms, reviews, amenities and CTA
              patterns from its main-area parent unless fields are overridden.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="text-sm text-muted-foreground">Inherited micro fields</p>
            <p className="mt-2 text-3xl font-bold">{inheritedCount}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="text-sm text-muted-foreground">Overrides</p>
            <p className="mt-2 text-3xl font-bold">{overrideCount}</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:col-span-3">
            <button className="cms-btn-primary" type="button" onClick={resetToParent}>
              <RotateCcw className="h-4 w-4" /> Reset unlocked fields to parent
            </button>
            <button className="cms-btn" type="button" onClick={() => setAllLocks(true)}>
              Lock all fields
            </button>
            <button className="cms-btn" type="button" onClick={() => setAllLocks(false)}>
              Unlock all fields
            </button>
          </div>
        </div>
      ) : (
        <EmptyState text="No sub-area pages are available." />
      )}
    </EditorShell>
  );
}

function ApplyToAllCenter({ snapshot }: { snapshot: CmsSnapshot }) {
  const micros = flattenTwinMicros(snapshot.digitalTwin);
  const [sourceKey, setSourceKey] = useState(
    micros[0]
      ? `${micros[0].page.id}|${micros[0].section.id}|${micros[0].component.id}|${micros[0].micro.id}`
      : "",
  );
  const [scope, setScope] = useState("all-pages-using-section");
  const [field, setField] = useState("value");
  const source = micros.find(
    (item) =>
      `${item.page.id}|${item.section.id}|${item.component.id}|${item.micro.id}` === sourceKey,
  );

  const apply = () => {
    if (!source) return;
    updateCmsSnapshot((draft) => {
      Object.values(draft.digitalTwin.pages).forEach((page) => {
        const include =
          scope === "entire-website" ||
          (scope === "this-page" && page.id === source.page.id) ||
          (scope === "all-pages-using-section" &&
            page.sections.some((section) => section.id === source.section.id)) ||
          (scope === "all-main-areas" && page.group === "main-area") ||
          (scope === "all-sub-areas" && page.group === "sub-area") ||
          (scope === "all-properties" && page.group === "property-detail");
        if (!include) return;
        page.sections = page.sections.map((sectionItem) => ({
          ...sectionItem,
          components: sectionItem.components.map((component) => ({
            ...component,
            microComponents: component.microComponents.map((micro) => {
              const sameTarget =
                (scope === "this-component" &&
                  page.id === source.page.id &&
                  sectionItem.id === source.section.id &&
                  component.id === source.component.id) ||
                (sectionItem.id === source.section.id &&
                  component.id === source.component.id &&
                  micro.id === source.micro.id);
              if (!sameTarget || micro.locked || micro.override) return micro;
              if (field === "value") return { ...micro, value: source.micro.value };
              if (field === "href") return { ...micro, href: source.micro.href };
              if (field === "icon") return { ...micro, icon: source.micro.icon };
              if (field === "visible") return { ...micro, visible: source.micro.visible };
              if (field === "sortOrder") return { ...micro, sortOrder: source.micro.sortOrder };
              if (field === "image") return { ...micro, image: source.micro.image };
              if (field === "animation") return { ...micro, animation: source.micro.animation };
              if (field === "background") return { ...micro, background: source.micro.background };
              if (field === "layout") return { ...micro, layout: source.micro.layout };
              return micro;
            }),
          })),
        }));
      });
      return draft;
    });
  };

  return (
    <EditorShell
      title="Apply-To-All Center"
      sub="Bulk edit Digital Twin micro fields while preserving locked fields and manual overrides."
    >
      <div className="grid gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft lg:grid-cols-[1.4fr_1fr_1fr_auto]">
        <SelectField
          label="Source Micro Component"
          value={sourceKey}
          onChange={setSourceKey}
          options={micros.map((item) => ({
            value: `${item.page.id}|${item.section.id}|${item.component.id}|${item.micro.id}`,
            label: `${item.page.title} / ${item.section.name} / ${item.component.name} / ${item.micro.name}`,
          }))}
        />
        <SelectField
          label="Scope"
          value={scope}
          onChange={setScope}
          options={[
            { value: "this-component", label: "This Component" },
            { value: "this-page", label: "This Page" },
            { value: "all-pages-using-section", label: "All Pages Using This Section" },
            { value: "all-main-areas", label: "All Main Areas" },
            { value: "all-sub-areas", label: "All Sub Areas" },
            { value: "all-properties", label: "All Properties" },
            { value: "entire-website", label: "Entire Website" },
          ]}
        />
        <SelectField
          label="Field"
          value={field}
          onChange={setField}
          options={[
            { value: "value", label: "Text / Value / Badge / Counter" },
            { value: "href", label: "CTA URL" },
            { value: "icon", label: "Icon" },
            { value: "visible", label: "Visibility" },
            { value: "sortOrder", label: "Sort Order" },
            { value: "image", label: "Image Metadata" },
            { value: "animation", label: "Animation" },
            { value: "background", label: "Background" },
            { value: "layout", label: "Layout" },
          ]}
        />
        <button className="cms-btn-primary mt-6" type="button" onClick={apply}>
          Apply
        </button>
      </div>
      <ApplyToAllPanel />
    </EditorShell>
  );
}

function CoverageGate({ snapshot }: { snapshot: CmsSnapshot }) {
  const micros = flattenTwinMicros(snapshot.digitalTwin);
  const editable = micros.filter((item) => !item.micro.locked).length;
  const images = micros.filter((item) => item.micro.type === "image" || item.micro.image).length;
  const ctas = micros.filter((item) => item.micro.type === "cta").length;
  const hidden = micros.filter((item) => !item.micro.visible).length;
  const coverage = micros.length ? Math.round((editable / micros.length) * 1000) / 10 : 0;

  return (
    <EditorShell
      title="Digital Twin Coverage Gate"
      sub="Checks the CMS model coverage available to admins inside the existing Admin CMS."
    >
      <div className="grid gap-4 md:grid-cols-5">
        {[
          { label: "Micro Components", value: micros.length },
          { label: "Editable", value: editable },
          { label: "Image Controls", value: images },
          { label: "CTA Controls", value: ctas },
          { label: "Hidden", value: hidden },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <p className="text-sm text-muted-foreground">Editable Digital Twin model coverage</p>
        <p className="mt-2 text-4xl font-bold">{coverage}%</p>
        <p className="mt-2 text-sm text-muted-foreground">
          This gate measures editable CMS entities. Public render wiring still uses hardcoded
          fallback when a micro component is missing, preserving compatibility.
        </p>
      </div>
    </EditorShell>
  );
}

function PageEditor({
  snapshot,
  selectedPage,
  selectedPageId,
  setSelectedPageId,
}: {
  snapshot: CmsSnapshot;
  selectedPage: CmsPage;
  selectedPageId: string;
  setSelectedPageId: (id: string) => void;
}) {
  return (
    <EditorShell title="Page Section Editor" sub="Edit, hide, duplicate and reorder sections.">
      <SelectField
        label="Select Page"
        value={selectedPageId}
        onChange={setSelectedPageId}
        options={Object.values(snapshot.pages).map((pageItem) => ({
          label: `${pageItem.title} (${pageItem.route})`,
          value: pageItem.id,
        }))}
      />
      <SectionEditor
        scopeLabel={selectedPage.title}
        sections={selectedPage.sections}
        onChange={(sections) =>
          updateCmsSnapshot((draft) => {
            draft.pages[selectedPage.id].sections = sections;
            return draft;
          })
        }
      />
    </EditorShell>
  );
}

function LocationEditor({
  snapshot,
  selectedLocation,
  selectedLocationSlug,
  setSelectedLocationSlug,
}: {
  snapshot: CmsSnapshot;
  selectedLocation: CmsLocationPage;
  selectedLocationSlug: string;
  setSelectedLocationSlug: (slug: string) => void;
}) {
  return (
    <EditorShell
      title="Location Page Editor"
      sub="Edit main areas, sub areas, location page content, images, FAQs, SEO and schema."
    >
      <SelectField
        label="Main Area"
        value={selectedLocationSlug}
        onChange={setSelectedLocationSlug}
        options={Object.values(snapshot.locationPages).map((location) => ({
          label: `${location.data.area} (${location.pageType})`,
          value: location.slug,
        }))}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <TextField
          label="Headline"
          value={selectedLocation.data.headline}
          onChange={(value) =>
            updateLocation(selectedLocation.slug, (location) => {
              location.data.headline = value;
            })
          }
        />
        <TextField
          label="Starting Rent"
          value={String(selectedLocation.data.startingRent)}
          onChange={(value) =>
            updateLocation(selectedLocation.slug, (location) => {
              location.data.startingRent = Number(value) || location.data.startingRent;
            })
          }
        />
      </div>
      <TextareaField
        label="Subheadline"
        value={selectedLocation.data.subheadline}
        onChange={(value) =>
          updateLocation(selectedLocation.slug, (location) => {
            location.data.subheadline = value;
          })
        }
      />
      <ImageManager
        label={`${selectedLocation.data.area} Gallery`}
        images={selectedLocation.data.gallery.map((item) => item.src)}
        usage={`location:${selectedLocation.slug}:gallery`}
        onChange={(images) =>
          updateLocation(selectedLocation.slug, (location) => {
            location.data.gallery = images.map((src, index) => ({
              src,
              alt: location.data.gallery[index]?.alt ?? `${location.data.area} image ${index + 1}`,
            }));
            location.sections = location.sections.map((sectionItem) =>
              sectionItem.id === "gallery" || sectionItem.id === "hero" || sectionItem.id === "cta"
                ? { ...sectionItem, images }
                : sectionItem,
            );
          })
        }
      />
      <TextareaField
        label="Sub Areas (one per line)"
        value={selectedLocation.subAreas.join("\n")}
        onChange={(value) =>
          updateLocation(selectedLocation.slug, (location) => {
            location.subAreas = value
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean);
            location.data.serviceAreas = location.subAreas.map((name) => ({
              name,
              href: `/pg-in-${name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")}`,
              description: "Premium PGs available nearby",
            }));
          })
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <TextareaField
          label="Intro"
          value={selectedLocation.data.intro}
          onChange={(value) =>
            updateLocation(selectedLocation.slug, (location) => {
              location.data.intro = value;
            })
          }
        />
        <TextareaField
          label="Why Stay Points (one per line)"
          value={selectedLocation.data.whyStay.join("\n")}
          onChange={(value) =>
            updateLocation(selectedLocation.slug, (location) => {
              location.data.whyStay = value
                .split("\n")
                .map((item) => item.trim())
                .filter(Boolean);
            })
          }
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <TextareaField
          label="Boys Room Cards JSON"
          rows={8}
          value={JSON.stringify(selectedLocation.data.boys, null, 2)}
          onChange={(value) =>
            updateLocation(selectedLocation.slug, (location) => {
              location.data.boys = safeJson(value, location.data.boys);
            })
          }
        />
        <TextareaField
          label="Girls Room Cards JSON"
          rows={8}
          value={JSON.stringify(selectedLocation.data.girls, null, 2)}
          onChange={(value) =>
            updateLocation(selectedLocation.slug, (location) => {
              location.data.girls = safeJson(value, location.data.girls);
            })
          }
        />
        <TextareaField
          label="Landmarks JSON"
          rows={8}
          value={JSON.stringify(selectedLocation.data.landmarks, null, 2)}
          onChange={(value) =>
            updateLocation(selectedLocation.slug, (location) => {
              location.data.landmarks = safeJson(value, location.data.landmarks);
            })
          }
        />
        <TextareaField
          label="Reviews JSON"
          rows={8}
          value={JSON.stringify(selectedLocation.data.testimonials, null, 2)}
          onChange={(value) =>
            updateLocation(selectedLocation.slug, (location) => {
              location.data.testimonials = safeJson(value, location.data.testimonials);
            })
          }
        />
        <TextareaField
          label="FAQs JSON"
          rows={8}
          value={JSON.stringify(selectedLocation.data.faqs, null, 2)}
          onChange={(value) =>
            updateLocation(selectedLocation.slug, (location) => {
              location.data.faqs = safeJson(value, location.data.faqs);
            })
          }
        />
        <TextField
          label="Map Query"
          value={selectedLocation.data.mapQuery}
          onChange={(value) =>
            updateLocation(selectedLocation.slug, (location) => {
              location.data.mapQuery = value;
            })
          }
        />
      </div>
      <SectionEditor
        scopeLabel={selectedLocation.data.area}
        sections={selectedLocation.sections}
        onChange={(sections) =>
          updateLocation(selectedLocation.slug, (location) => {
            location.sections = sections;
          })
        }
      />
    </EditorShell>
  );
}

function PropertyEditor({
  snapshot,
  selectedProperty,
  selectedPropertySlug,
  setSelectedPropertySlug,
}: {
  snapshot: CmsSnapshot;
  selectedProperty: CmsProperty;
  selectedPropertySlug: string;
  setSelectedPropertySlug: (slug: string) => void;
}) {
  const duplicateProperty = () => {
    updateCmsSnapshot((draft) => {
      const copy = {
        ...selectedProperty,
        slug: `${selectedProperty.slug}-copy`,
        name: `${selectedProperty.name} Copy`,
        hidden: true,
      };
      draft.properties.push(copy);
      return draft;
    });
    setSelectedPropertySlug(`${selectedProperty.slug}-copy`);
  };

  const createProperty = () => {
    updateCmsSnapshot((draft) => {
      const base = draft.properties[0];
      const slug = `new-property-${draft.properties.length + 1}`;
      draft.properties.push({
        ...base,
        slug,
        name: "New Property",
        hidden: true,
        priceFrom: 0,
      });
      return draft;
    });
  };

  return (
    <EditorShell
      title="Property Management"
      sub="Create, edit, hide, duplicate and manage property details."
    >
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <SelectField
          label="Select Property"
          value={selectedPropertySlug}
          onChange={setSelectedPropertySlug}
          options={snapshot.properties.map((property) => ({
            label: `${property.name}${property.hidden ? " (hidden)" : ""}`,
            value: property.slug,
          }))}
        />
        <button className="cms-btn mt-6" type="button" onClick={createProperty}>
          <Plus className="h-4 w-4" /> Create
        </button>
        <button className="cms-btn mt-6" type="button" onClick={duplicateProperty}>
          <Copy className="h-4 w-4" /> Duplicate
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TextField
          label="Property Name"
          value={selectedProperty.name}
          onChange={(value) =>
            updateProperty(selectedProperty.slug, (property) => (property.name = value))
          }
        />
        <TextField
          label="Slug"
          value={selectedProperty.slug}
          onChange={(value) =>
            updateProperty(selectedProperty.slug, (property) => (property.slug = slugify(value)))
          }
        />
        <TextField
          label="Location"
          value={selectedProperty.location}
          onChange={(value) =>
            updateProperty(selectedProperty.slug, (property) => {
              property.location = value;
              property.locationSlug = slugify(value);
            })
          }
        />
        <TextField
          label="Price From"
          value={String(selectedProperty.priceFrom)}
          onChange={(value) =>
            updateProperty(selectedProperty.slug, (property) => {
              property.priceFrom = Number(value) || property.priceFrom;
            })
          }
        />
        <TextField
          label="Availability"
          value={selectedProperty.availability}
          onChange={(value) =>
            updateProperty(selectedProperty.slug, (property) => (property.availability = value))
          }
        />
      </div>
      <SingleImageField
        label="Cover Image"
        value={selectedProperty.image}
        usage={`property:${selectedProperty.slug}:cover`}
        onChange={(value) =>
          updateProperty(selectedProperty.slug, (property) => {
            property.image = value;
            if (!property.gallery.includes(value)) {
              property.gallery = [value, ...property.gallery];
            }
          })
        }
      />
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          checked={Boolean(selectedProperty.hidden)}
          onChange={(event) =>
            updateProperty(
              selectedProperty.slug,
              (property) => (property.hidden = event.currentTarget.checked),
            )
          }
        />
        Hide property from public listings
      </label>
      <TextareaField
        label="Description"
        value={selectedProperty.description}
        onChange={(value) =>
          updateProperty(selectedProperty.slug, (property) => (property.description = value))
        }
      />
      <TextareaField
        label="Amenities (one per line)"
        value={selectedProperty.amenities.join("\n")}
        onChange={(value) =>
          updateProperty(selectedProperty.slug, (property) => {
            property.amenities = value
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean);
          })
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <TextareaField
          label="Nearby Places JSON"
          rows={8}
          value={JSON.stringify(selectedProperty.nearby, null, 2)}
          onChange={(value) =>
            updateProperty(selectedProperty.slug, (property) => {
              property.nearby = safeJson(value, property.nearby);
            })
          }
        />
        <TextareaField
          label="Rules JSON"
          rows={8}
          value={JSON.stringify(selectedProperty.rules, null, 2)}
          onChange={(value) =>
            updateProperty(selectedProperty.slug, (property) => {
              property.rules = safeJson(value, property.rules);
            })
          }
        />
      </div>
      <div className="grid gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft lg:grid-cols-3">
        <TextField
          label="Manager Name"
          value={selectedProperty.manager.name}
          onChange={(value) =>
            updateProperty(selectedProperty.slug, (property) => {
              property.manager.name = value;
            })
          }
        />
        <TextField
          label="Manager Role"
          value={selectedProperty.manager.role}
          onChange={(value) =>
            updateProperty(selectedProperty.slug, (property) => {
              property.manager.role = value;
            })
          }
        />
        <TextField
          label="Manager Phone"
          value={selectedProperty.manager.phone}
          onChange={(value) =>
            updateProperty(selectedProperty.slug, (property) => {
              property.manager.phone = value;
            })
          }
        />
        <SingleImageField
          label="Manager Photo"
          value={selectedProperty.manager.photo}
          usage={`property:${selectedProperty.slug}:manager`}
          onChange={(value) =>
            updateProperty(selectedProperty.slug, (property) => {
              property.manager.photo = value;
            })
          }
        />
      </div>
      <ImageManager
        label="Property Gallery"
        images={selectedProperty.gallery}
        usage={`property:${selectedProperty.slug}:gallery`}
        onChange={(images) =>
          updateProperty(selectedProperty.slug, (property) => {
            property.gallery = images;
            property.image = images[0] ?? property.image;
          })
        }
      />
      <SectionEditor
        scopeLabel={selectedProperty.name}
        sections={selectedProperty.sections ?? []}
        onChange={(sections) =>
          updateProperty(selectedProperty.slug, (property) => {
            property.sections = sections;
          })
        }
      />
    </EditorShell>
  );
}

function SeoManager({ snapshot }: { snapshot: CmsSnapshot }) {
  const [kind, setKind] = useState<"page" | "location" | "property">("page");
  const [target, setTarget] = useState("home");

  const options = useMemo(() => {
    if (kind === "location") {
      return Object.values(snapshot.locationPages).map((item) => ({
        value: item.slug,
        label: `${item.data.area} (${item.pageType})`,
      }));
    }
    if (kind === "property") {
      return snapshot.properties.map((item) => ({ value: item.slug, label: item.name }));
    }
    return Object.values(snapshot.pages).map((item) => ({ value: item.id, label: item.title }));
  }, [kind, snapshot]);

  const seoValue =
    kind === "location"
      ? snapshot.locationPages[target]?.seo
      : kind === "property"
        ? snapshot.properties.find((item) => item.slug === target)?.seo
        : snapshot.pages[target]?.seo;

  return (
    <EditorShell title="SEO Manager" sub="Meta, OG, canonical, robots and schema fields.">
      <div className="grid gap-4 md:grid-cols-2">
        <SelectField
          label="Type"
          value={kind}
          onChange={(value) => {
            const nextKind = value as "page" | "location" | "property";
            setKind(nextKind);
            const first =
              nextKind === "location"
                ? Object.keys(snapshot.locationPages)[0]
                : nextKind === "property"
                  ? snapshot.properties[0]?.slug
                  : Object.keys(snapshot.pages)[0];
            setTarget(first ?? "");
          }}
          options={[
            { value: "page", label: "Page" },
            { value: "location", label: "Location" },
            { value: "property", label: "Property" },
          ]}
        />
        <SelectField label="Target" value={target} onChange={setTarget} options={options} />
      </div>
      {seoValue ? (
        <div className="grid gap-4">
          {(["metaTitle", "metaDescription", "canonicalUrl", "robots"] as const).map((field) => (
            <TextareaField
              key={field}
              label={field}
              value={seoValue[field] ?? ""}
              onChange={(value) => updateSeo(kind, target, field, value)}
            />
          ))}
          <SingleImageField
            label="OG Image"
            value={seoValue.ogImage ?? ""}
            usage={`seo:${kind}:${target}`}
            onChange={(value) => updateSeo(kind, target, "ogImage", value)}
          />
          {(
            [
              "schemaJson",
              "breadcrumbSchemaJson",
              "faqSchemaJson",
              "localBusinessSchemaJson",
            ] as const
          ).map((field) => (
            <TextareaField
              key={field}
              label={field}
              value={seoValue[field] ?? ""}
              rows={7}
              onChange={(value) => updateSeo(kind, target, field, value)}
            />
          ))}
        </div>
      ) : null}
    </EditorShell>
  );
}

function MediaLibrary({ snapshot }: { snapshot: CmsSnapshot }) {
  const [fromUrl, setFromUrl] = useState(snapshot.media[0]?.url ?? "");

  const replace = async (files: FileList | null) => {
    const [uploaded] = await readImages(files);
    if (!fromUrl || !uploaded) return;
    updateCmsSnapshot((draft) => replaceMediaEverywhere(draft, fromUrl, uploaded));
    registerUploadedMedia([uploaded], "media-library:replacement");
  };

  return (
    <EditorShell
      title="Media Library"
      sub="Upload, remove and replace images without typing links."
    >
      <div className="grid min-w-0 gap-3 rounded-2xl border border-border bg-muted/40 p-4 lg:grid-cols-[minmax(0,1fr)_auto]">
        <SelectField
          label="Select Image To Replace"
          value={fromUrl}
          onChange={setFromUrl}
          options={snapshot.media.map((asset) => ({
            value: asset.url,
            label: `${asset.name} - ${asset.usage.join(", ")}`,
          }))}
        />
        <ImageUploadButton label="Upload Replacement" multiple={false} onUpload={replace} />
      </div>
      <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {snapshot.media.map((asset) => (
          <div
            key={asset.id}
            className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
          >
            <div
              aria-label={asset.alt}
              className="cms-media-preview bg-muted/40"
              role="img"
              style={{ backgroundImage: `url("${asset.url || fallbackImage}")` }}
            />
            <div className="flex flex-1 flex-col p-4">
              <h3 className="line-clamp-1 font-semibold">{asset.name}</h3>
              <p className="mt-3 line-clamp-2 min-h-8 break-words text-xs text-muted-foreground">
                {asset.usage.join(", ")}
              </p>
              <button
                className="cms-btn-danger mt-auto w-full"
                type="button"
                onClick={() =>
                  updateCmsSnapshot((draft) => {
                    draft.media = draft.media.filter((item) => item.id !== asset.id);
                    return draft;
                  })
                }
              >
                <Trash2 className="h-4 w-4" /> Remove from library
              </button>
            </div>
          </div>
        ))}
      </div>
    </EditorShell>
  );
}

function LeadManager({ snapshot }: { snapshot: CmsSnapshot }) {
  const addLead = () =>
    updateCmsSnapshot((draft) => {
      draft.leads.unshift({
        id: `lead-${Date.now()}`,
        createdAt: new Date().toISOString(),
        source: "manual",
        name: "New Lead",
        phone: "",
        status: "new",
      });
      return draft;
    });

  return (
    <EditorShell title="Leads" sub="Track enquiries and visit status.">
      <button className="cms-btn w-fit" type="button" onClick={addLead}>
        <Plus className="h-4 w-4" /> Add Lead
      </button>
      <div className="grid gap-3">
        {snapshot.leads.length === 0 ? (
          <EmptyState text="No leads captured yet." />
        ) : (
          snapshot.leads.map((lead) => (
            <div key={lead.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="grid gap-3 md:grid-cols-4">
                <TextField
                  label="Name"
                  value={lead.name}
                  onChange={(value) =>
                    updateCmsSnapshot((draft) => {
                      const item = draft.leads.find((entry) => entry.id === lead.id);
                      if (item) item.name = value;
                      return draft;
                    })
                  }
                />
                <TextField
                  label="Phone"
                  value={lead.phone}
                  onChange={(value) =>
                    updateCmsSnapshot((draft) => {
                      const item = draft.leads.find((entry) => entry.id === lead.id);
                      if (item) item.phone = value;
                      return draft;
                    })
                  }
                />
                <TextField
                  label="Source"
                  value={lead.source}
                  onChange={(value) =>
                    updateCmsSnapshot((draft) => {
                      const item = draft.leads.find((entry) => entry.id === lead.id);
                      if (item) item.source = value;
                      return draft;
                    })
                  }
                />
                <SelectField
                  label="Status"
                  value={lead.status}
                  onChange={(value) =>
                    updateCmsSnapshot((draft) => {
                      const item = draft.leads.find((entry) => entry.id === lead.id);
                      if (item) item.status = value as typeof item.status;
                      return draft;
                    })
                  }
                  options={["new", "contacted", "visited", "closed", "lost"].map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </EditorShell>
  );
}

function GlobalSettings({ snapshot }: { snapshot: CmsSnapshot }) {
  return (
    <EditorShell title="Global Settings" sub="Edit global brand, phone, WhatsApp and CTA defaults.">
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(snapshot.settings).map(([key, value]) => (
          <TextField
            key={key}
            label={key}
            value={String(value)}
            onChange={(nextValue) =>
              updateCmsSnapshot((draft) => {
                draft.settings = { ...draft.settings, [key]: nextValue };
                return draft;
              })
            }
          />
        ))}
      </div>
      <ApplyToAllPanel />
    </EditorShell>
  );
}

function LivePreview({
  snapshot,
  previewUrl,
  setPreviewUrl,
  previewDevice,
  setPreviewDevice,
}: {
  snapshot: CmsSnapshot;
  previewUrl: string;
  setPreviewUrl: (value: string) => void;
  previewDevice: "desktop" | "tablet" | "mobile";
  setPreviewDevice: (value: "desktop" | "tablet" | "mobile") => void;
}) {
  const width =
    previewDevice === "desktop" ? "100%" : previewDevice === "tablet" ? "768px" : "390px";
  const routeOptions = [
    ...Object.values(snapshot.pages).filter((pageItem) => pageItem.route.startsWith("/")),
    ...Object.values(snapshot.locationPages).map((item) => ({
      id: item.slug,
      title: item.data.area,
      route: `/${item.slug}`,
    })),
    ...snapshot.properties.map((item) => ({
      id: item.slug,
      title: item.name,
      route: `/properties/${item.slug}`,
    })),
  ];

  return (
    <EditorShell title="Live Preview" sub="Preview public pages before publishing.">
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <SelectField
          label="Preview Route"
          value={previewUrl}
          onChange={setPreviewUrl}
          options={routeOptions.map((item) => ({
            value: item.route,
            label: `${item.title} - ${item.route}`,
          }))}
        />
        <div className="mt-6 flex rounded-xl border border-border bg-card p-1">
          {(["desktop", "tablet", "mobile"] as const).map((device) => (
            <button
              key={device}
              type="button"
              onClick={() => setPreviewDevice(device)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold capitalize",
                previewDevice === device
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              {device}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-auto rounded-2xl border border-border bg-slate-950 p-4">
        <iframe
          title="CMS live preview"
          src={previewUrl}
          className="mx-auto h-[760px] rounded-xl bg-white"
          style={{ width, maxWidth: "100%" }}
        />
      </div>
    </EditorShell>
  );
}

function SectionEditor({
  scopeLabel,
  sections,
  onChange,
}: {
  scopeLabel: string;
  sections: CmsSection[];
  onChange: (sections: CmsSection[]) => void;
}) {
  const [selectedSectionId, setSelectedSectionId] = useState(sections[0]?.id ?? "");
  const [dragId, setDragId] = useState<string | null>(null);
  const selectedSection =
    sections.find((sectionItem) => sectionItem.id === selectedSectionId) ?? sections[0];

  const updateSection = (id: string, patch: Partial<CmsSection>) =>
    onChange(
      sections.map((sectionItem) =>
        sectionItem.id === id ? { ...sectionItem, ...patch } : sectionItem,
      ),
    );

  const move = (id: string, direction: -1 | 1) => {
    const index = sections.findIndex((sectionItem) => sectionItem.id === id);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= sections.length) return;
    const next = [...sections];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    onChange(next);
  };

  const duplicate = (sectionItem: CmsSection) => {
    const copy = {
      ...sectionItem,
      id: `${sectionItem.id}-copy-${Date.now()}`,
      name: `${sectionItem.name} Copy`,
      custom: true,
    };
    onChange([...sections, copy]);
    setSelectedSectionId(copy.id);
  };

  const addCustom = () => {
    const custom = {
      id: `custom-${Date.now()}`,
      type: "custom",
      name: "Custom Section",
      heading: "New custom section",
      subheading: "",
      paragraph: "",
      buttonText: "",
      buttonHref: "",
      images: [],
      blocks: [],
      custom: true,
    };
    onChange([...sections, custom]);
    setSelectedSectionId(custom.id);
  };

  const dropOn = (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const from = sections.findIndex((sectionItem) => sectionItem.id === dragId);
    const to = sections.findIndex((sectionItem) => sectionItem.id === targetId);
    if (from < 0 || to < 0) return;
    const next = [...sections];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
    setDragId(null);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[310px_1fr]">
      <div className="rounded-2xl border border-border bg-card p-3 shadow-soft">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {scopeLabel}
            </p>
            <h3 className="font-display text-lg font-bold">Sections</h3>
          </div>
          <button
            className="cms-icon-btn"
            type="button"
            onClick={addCustom}
            title="Add custom section"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="grid gap-2">
          {sections.map((sectionItem) => (
            <button
              key={sectionItem.id}
              type="button"
              draggable
              onDragStart={() => setDragId(sectionItem.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => dropOn(sectionItem.id)}
              onClick={() => setSelectedSectionId(sectionItem.id)}
              className={cn(
                "rounded-xl border p-3 text-left transition",
                selectedSection?.id === sectionItem.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background hover:bg-accent",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{sectionItem.name}</span>
                {sectionItem.hidden ? (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                    Hidden
                  </span>
                ) : null}
              </div>
              <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                {sectionItem.heading}
              </p>
            </button>
          ))}
        </div>
      </div>

      {selectedSection ? (
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Section controls
              </p>
              <h3 className="font-display text-xl font-bold">{selectedSection.name}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="cms-icon-btn"
                type="button"
                onClick={() => move(selectedSection.id, -1)}
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                className="cms-icon-btn"
                type="button"
                onClick={() => move(selectedSection.id, 1)}
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                className="cms-icon-btn"
                type="button"
                onClick={() => duplicate(selectedSection)}
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                className="cms-icon-btn"
                type="button"
                onClick={() =>
                  updateSection(selectedSection.id, { hidden: !selectedSection.hidden })
                }
              >
                <Eye className="h-4 w-4" />
              </button>
              {selectedSection.custom ? (
                <button
                  className="cms-icon-btn-danger"
                  type="button"
                  onClick={() =>
                    onChange(
                      sections.filter((sectionItem) => sectionItem.id !== selectedSection.id),
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </div>
          <div className="grid gap-4">
            <TextField
              label="Section Name"
              value={selectedSection.name}
              onChange={(value) => updateSection(selectedSection.id, { name: value })}
            />
            <TextField
              label="Heading"
              value={selectedSection.heading}
              onChange={(value) => updateSection(selectedSection.id, { heading: value })}
            />
            <TextField
              label="Sub Heading"
              value={selectedSection.subheading ?? ""}
              onChange={(value) => updateSection(selectedSection.id, { subheading: value })}
            />
            <TextareaField
              label="Paragraph"
              value={selectedSection.paragraph ?? ""}
              onChange={(value) => updateSection(selectedSection.id, { paragraph: value })}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Button Text"
                value={selectedSection.buttonText ?? ""}
                onChange={(value) => updateSection(selectedSection.id, { buttonText: value })}
              />
              <TextField
                label="Button Link"
                value={selectedSection.buttonHref ?? ""}
                onChange={(value) => updateSection(selectedSection.id, { buttonHref: value })}
              />
            </div>
            <ImageManager
              label="Section Images"
              images={selectedSection.images}
              usage={`section:${selectedSection.id}`}
              onChange={(images) => updateSection(selectedSection.id, { images })}
            />
            <TextareaField
              label="Content Blocks JSON"
              rows={10}
              value={JSON.stringify(selectedSection.blocks, null, 2)}
              onChange={(value) => {
                const blocks = safeJson(value, selectedSection.blocks);
                updateSection(selectedSection.id, { blocks });
              }}
            />
          </div>
        </div>
      ) : (
        <EmptyState text="No sections yet." />
      )}
    </div>
  );
}

function ApplyToAllPanel() {
  const [sectionId, setSectionId] = useState("cta");
  const [buttonText, setButtonText] = useState("");
  const [scope, setScope] = useState<
    "all-locations" | "all-main-areas" | "all-sub-areas" | "all-properties" | "entire-website"
  >("all-locations");

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <h3 className="font-display text-lg font-bold">Apply To All</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Update matching section fields across all locations, all properties, or the entire website.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
        <TextField label="Section ID" value={sectionId} onChange={setSectionId} />
        <TextField label="Button Text" value={buttonText} onChange={setButtonText} />
        <SelectField
          label="Scope"
          value={scope}
          onChange={(value) => setScope(value as typeof scope)}
          options={[
            { value: "all-locations", label: "Apply To All Main Areas / Sub Areas" },
            { value: "all-main-areas", label: "Apply To Main Areas Only" },
            { value: "all-sub-areas", label: "Apply To Sub Areas Only" },
            { value: "all-properties", label: "Apply To All Properties" },
            { value: "entire-website", label: "Apply To Entire Website" },
          ]}
        />
        <button
          className="cms-btn mt-6"
          type="button"
          onClick={() =>
            updateCmsSnapshot((draft) =>
              applySectionTextToScope(draft, sectionId, { buttonText }, scope),
            )
          }
        >
          Apply
        </button>
      </div>
    </div>
  );
}

function EditorShell({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-5">
      <div>
        <h2 className="font-display text-2xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
      </div>
      {children}
    </div>
  );
}

function ImageUploadButton({
  label,
  multiple,
  onUpload,
}: {
  label: string;
  multiple: boolean;
  onUpload: (files: FileList | null) => void | Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          void onUpload(event.currentTarget.files);
          event.currentTarget.value = "";
        }}
      />
      <button className="cms-btn mt-6" type="button" onClick={() => inputRef.current?.click()}>
        <Upload className="h-4 w-4" /> {label}
      </button>
    </>
  );
}

function SingleImageField({
  label,
  value,
  usage,
  onChange,
}: {
  label: string;
  value: string;
  usage: string;
  onChange: (value: string) => void;
}) {
  const upload = async (files: FileList | null) => {
    const [uploaded] = await readImages(files);
    if (!uploaded) return;
    registerUploadedMedia([uploaded], usage);
    onChange(uploaded);
  };

  return (
    <div className="grid gap-2 rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload, replace or remove this image.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ImageUploadButton
            label={value ? "Replace Image" : "Upload Image"}
            multiple={false}
            onUpload={upload}
          />
          {value ? (
            <button className="cms-btn-danger mt-6" type="button" onClick={() => onChange("")}>
              <Trash2 className="h-4 w-4" /> Remove
            </button>
          ) : null}
        </div>
      </div>
      {value ? (
        <img
          src={value}
          alt={label}
          className="mt-2 aspect-[1.8] w-full rounded-xl border border-border object-cover"
        />
      ) : (
        <div className="mt-2 grid aspect-[1.8] place-items-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
          No image selected
        </div>
      )}
    </div>
  );
}

function ImageManager({
  label,
  images,
  usage,
  onChange,
}: {
  label: string;
  images: string[];
  usage: string;
  onChange: (images: string[]) => void;
}) {
  const upload = async (files: FileList | null) => {
    const uploaded = await readImages(files);
    if (uploaded.length === 0) return;
    registerUploadedMedia(uploaded, usage);
    onChange([...images, ...uploaded]);
  };

  const replaceAt = async (index: number, files: FileList | null) => {
    const [uploaded] = await readImages(files);
    if (!uploaded) return;
    registerUploadedMedia([uploaded], `${usage}:replacement`);
    onChange(images.map((image, imageIndex) => (imageIndex === index ? uploaded : image)));
  };

  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload, delete, replace, and reorder images.
          </p>
        </div>
        <ImageUploadButton label="Upload Images" multiple onUpload={upload} />
      </div>
      {images.length === 0 ? (
        <div className="grid min-h-36 place-items-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
          No images selected
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="overflow-hidden rounded-xl border border-border bg-background"
            >
              <img
                src={image}
                alt={`${label} ${index + 1}`}
                className="aspect-[1.45] w-full object-cover"
              />
              <div className="grid gap-2 p-3">
                <div className="flex gap-2">
                  <button
                    className="cms-icon-btn"
                    type="button"
                    onClick={() => onChange(moveArrayItem(images, index, -1))}
                    title="Move up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    className="cms-icon-btn"
                    type="button"
                    onClick={() => onChange(moveArrayItem(images, index, 1))}
                    title="Move down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    className="cms-icon-btn-danger"
                    type="button"
                    onClick={() => onChange(images.filter((_, imageIndex) => imageIndex !== index))}
                    title="Remove image"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <ImageUploadButton
                  label="Replace"
                  multiple={false}
                  onUpload={(files) => replaceAt(index, files)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid min-w-0 gap-1.5">
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        className="h-11 w-full min-w-0 rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="grid min-w-0 gap-1.5">
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.currentTarget.value)}
        className="min-h-28 w-full min-w-0 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="grid min-w-0 gap-1.5">
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        className="h-11 w-full min-w-0 max-w-full truncate rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}

function updateLocation(slug: string, updater: (location: CmsLocationPage) => void) {
  updateCmsSnapshot((draft) => {
    const location = draft.locationPages[slug];
    if (location) updater(location);
    return draft;
  });
}

function updateProperty(slug: string, updater: (property: CmsProperty) => void) {
  updateCmsSnapshot((draft) => {
    const property = draft.properties.find((item) => item.slug === slug);
    if (property) updater(property);
    return draft;
  });
}

function updateSeo(
  kind: "page" | "location" | "property",
  target: string,
  field: string,
  value: string,
) {
  updateCmsSnapshot((draft) => {
    if (kind === "page" && draft.pages[target]) {
      draft.pages[target].seo = { ...draft.pages[target].seo, [field]: value };
    }
    if (kind === "location" && draft.locationPages[target]) {
      draft.locationPages[target].seo = { ...draft.locationPages[target].seo, [field]: value };
    }
    if (kind === "property") {
      const property = draft.properties.find((item) => item.slug === target);
      if (property) property.seo = { ...property.seo, [field]: value };
    }
    return draft;
  });
}

function safeJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
