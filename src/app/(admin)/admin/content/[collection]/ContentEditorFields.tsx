import type { Collection } from "@/server/db/schema";
import { Field } from "@/components/admin/Field";
import { Input } from "@/components/admin/Input";
import { Textarea } from "@/components/admin/Textarea";
import { Select } from "@/components/admin/Select";
import { Checkbox } from "@/components/admin/Checkbox";
import { RepeatableStringList, RepeatableGroupList } from "@/components/admin/RepeatableList";

/**
 * Field renderer per collection, generated from the same Zod schemas
 * (`src/server/content/schemas.ts`) that validate the submission — so the
 * editor form and the public site can never disagree about what a valid
 * row looks like.
 */

type Data = Record<string, unknown>;
type Errors = Record<string, string>;

function str(data: Data | null, key: string): string {
  return typeof data?.[key] === "string" ? (data[key] as string) : "";
}
function bool(data: Data | null, key: string): boolean {
  return data?.[key] === true;
}
function arr(data: Data | null, key: string): string[] {
  return Array.isArray(data?.[key]) ? (data[key] as string[]) : [];
}
function objArr<T extends Record<string, unknown>>(data: Data | null, key: string): T[] {
  return Array.isArray(data?.[key]) ? (data[key] as T[]) : [];
}

const ICON_OPTIONS = ["code", "cloud", "refresh", "data", "spark", "team", "shield"] as const;

export function ContentEditorFields({
  collection,
  data,
  errors,
}: {
  collection: Collection;
  data: Data | null;
  errors: Errors;
}) {
  switch (collection) {
    case "service":
      return (
        <>
          <Field label="Title" htmlFor="title" error={errors.title}>
            <Input id="title" name="title" defaultValue={str(data, "title")} required />
          </Field>
          <Field label="Page heading" htmlFor="heading" error={errors.heading}>
            <Input id="heading" name="heading" defaultValue={str(data, "heading")} required />
          </Field>
          <Field label="Meta title" htmlFor="metaTitle" error={errors.metaTitle}>
            <Input id="metaTitle" name="metaTitle" defaultValue={str(data, "metaTitle")} required />
          </Field>
          <Field label="Meta description" htmlFor="metaDescription" error={errors.metaDescription}>
            <Textarea
              id="metaDescription"
              name="metaDescription"
              defaultValue={str(data, "metaDescription")}
              rows={2}
              required
            />
          </Field>
          <Field label="Menu description" htmlFor="navDescription" error={errors.navDescription}>
            <Input
              id="navDescription"
              name="navDescription"
              defaultValue={str(data, "navDescription")}
              required
            />
          </Field>
          <Field label="Card summary" htmlFor="summary" error={errors.summary}>
            <Textarea id="summary" name="summary" defaultValue={str(data, "summary")} required />
          </Field>
          <Field label="Icon" htmlFor="iconName" error={errors.iconName}>
            <Select id="iconName" name="iconName" defaultValue={str(data, "iconName") || "code"}>
              {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </Select>
          </Field>
          <RepeatableStringList name="bullets" label="Bullets" initialValues={arr(data, "bullets")} max={5} />
          <RepeatableStringList
            name="intro"
            label="Intro paragraphs"
            initialValues={arr(data, "intro")}
            multiline
            max={4}
          />
          <RepeatableStringList name="signals" label="Signals" initialValues={arr(data, "signals")} max={8} />
          <RepeatableGroupList
            name="sections"
            label="Sections"
            initialValues={objArr<{ title: string; body: string }>(data, "sections")}
            emptyRow={{ title: "", body: "" }}
            max={8}
            renderRow={(fieldName, row) => (
              <>
                <Input name={fieldName("title")} defaultValue={row.title} placeholder="Section title" />
                <Textarea name={fieldName("body")} defaultValue={row.body} placeholder="Body" />
              </>
            )}
          />
          <RepeatableStringList
            name="deliverables"
            label="Deliverables"
            initialValues={arr(data, "deliverables")}
            max={10}
          />
          <RepeatableStringList
            name="technologies"
            label="Technologies"
            initialValues={arr(data, "technologies")}
            max={20}
          />
          <RepeatableGroupList
            name="faqs"
            label="FAQs"
            initialValues={objArr<{ question: string; answer: string }>(data, "faqs")}
            emptyRow={{ question: "", answer: "" }}
            max={10}
            renderRow={(fieldName, row) => (
              <>
                <Input name={fieldName("question")} defaultValue={row.question} placeholder="Question" />
                <Textarea name={fieldName("answer")} defaultValue={row.answer} placeholder="Answer" />
              </>
            )}
          />
          <RepeatableStringList
            name="related"
            label="Related service slugs"
            initialValues={arr(data, "related")}
            max={4}
          />
        </>
      );

    case "industry":
      return (
        <>
          <Field label="Name" htmlFor="name" error={errors.name}>
            <Input id="name" name="name" defaultValue={str(data, "name")} required />
          </Field>
          <Field label="Short note" htmlFor="note" error={errors.note}>
            <Input id="note" name="note" defaultValue={str(data, "note")} required />
          </Field>
          <Field label="Description" htmlFor="body" error={errors.body}>
            <Textarea id="body" name="body" defaultValue={str(data, "body")} required />
          </Field>
          <RepeatableStringList name="focus" label="Focus areas" initialValues={arr(data, "focus")} max={6} />
        </>
      );

    case "caseStudy":
      return (
        <>
          <Field label="Client name or descriptor" htmlFor="client" error={errors.client}>
            <Input id="client" name="client" defaultValue={str(data, "client")} required />
          </Field>
          <Field label="Industry" htmlFor="industry" error={errors.industry}>
            <Input id="industry" name="industry" defaultValue={str(data, "industry")} required />
          </Field>
          <Field label="Challenge" htmlFor="challenge" error={errors.challenge}>
            <Textarea id="challenge" name="challenge" defaultValue={str(data, "challenge")} required />
          </Field>
          <Field label="Outcome" htmlFor="outcome" error={errors.outcome}>
            <Textarea id="outcome" name="outcome" defaultValue={str(data, "outcome")} required />
          </Field>
          <Field label="Headline metric" htmlFor="metric" error={errors.metric}>
            <Input id="metric" name="metric" defaultValue={str(data, "metric")} required />
          </Field>
          <Field label="Metric label" htmlFor="metricLabel" error={errors.metricLabel}>
            <Input id="metricLabel" name="metricLabel" defaultValue={str(data, "metricLabel")} required />
          </Field>
          <Field label="Image" htmlFor="imageId" error={errors.imageId}>
            <Input
              id="imageId"
              name="imageId"
              defaultValue={str(data, "imageId")}
              placeholder="Media asset ID (pick from the Media library)"
            />
          </Field>
          <Checkbox
            id="clientNameApproved"
            name="clientNameApproved"
            label="Client has approved naming them"
            defaultChecked={bool(data, "clientNameApproved")}
          />
        </>
      );

    case "testimonial":
      return (
        <>
          <Field label="Quote" htmlFor="quote" error={errors.quote}>
            <Textarea id="quote" name="quote" defaultValue={str(data, "quote")} required />
          </Field>
          <Field label="Name" htmlFor="name" error={errors.name}>
            <Input id="name" name="name" defaultValue={str(data, "name")} required />
          </Field>
          <Field label="Job title" htmlFor="role" error={errors.role}>
            <Input id="role" name="role" defaultValue={str(data, "role")} required />
          </Field>
          <Field label="Company" htmlFor="company" error={errors.company}>
            <Input id="company" name="company" defaultValue={str(data, "company")} required />
          </Field>
          <Field label="Avatar" htmlFor="avatarId" error={errors.avatarId}>
            <Input
              id="avatarId"
              name="avatarId"
              defaultValue={str(data, "avatarId")}
              placeholder="Media asset ID (pick from the Media library)"
            />
          </Field>
          <Checkbox
            id="attributionApproved"
            name="attributionApproved"
            label="They've approved being named"
            defaultChecked={bool(data, "attributionApproved")}
          />
        </>
      );

    case "faq":
      return (
        <>
          <Field label="Question" htmlFor="question" error={errors.question}>
            <Input id="question" name="question" defaultValue={str(data, "question")} required />
          </Field>
          <Field label="Answer" htmlFor="answer" error={errors.answer}>
            <Textarea id="answer" name="answer" defaultValue={str(data, "answer")} required />
          </Field>
          <Field label="Placement" htmlFor="placement" error={errors.placement}>
            <Select id="placement" name="placement" defaultValue={str(data, "placement") || "home"}>
              <option value="home">Home page</option>
              <option value="service">Service page</option>
            </Select>
          </Field>
        </>
      );

    case "pillar":
    case "process":
      return (
        <>
          <Field label="Step number" htmlFor="step" error={errors.step}>
            <Input id="step" name="step" defaultValue={str(data, "step")} required />
          </Field>
          <Field label="Title" htmlFor="title" error={errors.title}>
            <Input id="title" name="title" defaultValue={str(data, "title")} required />
          </Field>
          <Field label="Body" htmlFor="body" error={errors.body}>
            <Textarea id="body" name="body" defaultValue={str(data, "body")} required />
          </Field>
        </>
      );

    case "techStack":
      return (
        <>
          <Field label="Group name" htmlFor="group" error={errors.group}>
            <Input id="group" name="group" defaultValue={str(data, "group")} required />
          </Field>
          <RepeatableStringList name="items" label="Items" initialValues={arr(data, "items")} max={20} />
        </>
      );

    case "engagementModel":
      return (
        <>
          <Field label="Name" htmlFor="name" error={errors.name}>
            <Input id="name" name="name" defaultValue={str(data, "name")} required />
          </Field>
          <Field label="Tagline" htmlFor="tagline" error={errors.tagline}>
            <Input id="tagline" name="tagline" defaultValue={str(data, "tagline")} required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price" htmlFor="price" error={errors.price}>
              <Input id="price" name="price" defaultValue={str(data, "price")} required />
            </Field>
            <Field label="Unit" htmlFor="unit" error={errors.unit}>
              <Input id="unit" name="unit" defaultValue={str(data, "unit")} required />
            </Field>
          </div>
          <Field label="Summary" htmlFor="summary" error={errors.summary}>
            <Textarea id="summary" name="summary" defaultValue={str(data, "summary")} required />
          </Field>
          <RepeatableStringList
            name="includes"
            label="What's included"
            initialValues={arr(data, "includes")}
            max={8}
          />
          <Checkbox
            id="popular"
            name="popular"
            label="Highlight as the popular option"
            defaultChecked={bool(data, "popular")}
          />
        </>
      );

    case "page":
      return (
        <>
          <Field label="Meta title" htmlFor="metaTitle" error={errors.metaTitle}>
            <Input id="metaTitle" name="metaTitle" defaultValue={str(data, "metaTitle")} required />
          </Field>
          <Field label="Meta description" htmlFor="metaDescription" error={errors.metaDescription}>
            <Textarea
              id="metaDescription"
              name="metaDescription"
              defaultValue={str(data, "metaDescription")}
              rows={2}
              required
            />
          </Field>
          <Field label="Heading" htmlFor="heading" error={errors.heading}>
            <Input id="heading" name="heading" defaultValue={str(data, "heading")} required />
          </Field>
          <RepeatableStringList
            name="intro"
            label="Intro paragraphs"
            initialValues={arr(data, "intro")}
            multiline
            max={5}
          />
          <RepeatableGroupList
            name="blocks"
            label="Sections"
            initialValues={objArr<{ title: string; body: string }>(data, "blocks")}
            emptyRow={{ title: "", body: "" }}
            max={12}
            renderRow={(fieldName, row) => (
              <>
                <Input name={fieldName("title")} defaultValue={row.title} placeholder="Section title" />
                <Textarea name={fieldName("body")} defaultValue={row.body} placeholder="Body" />
              </>
            )}
          />

          {/* The sections below are only used by About/Careers/Technology/Contact —
              leave them empty on pages that don't need them. */}
          <RepeatableGroupList
            name="principles"
            label="Principles (About)"
            initialValues={objArr<{ title: string; body: string }>(data, "principles")}
            emptyRow={{ title: "", body: "" }}
            max={10}
            renderRow={(fieldName, row) => (
              <>
                <Input name={fieldName("title")} defaultValue={row.title} placeholder="Title" />
                <Textarea name={fieldName("body")} defaultValue={row.body} placeholder="Body" />
              </>
            )}
          />
          <RepeatableGroupList
            name="leadership"
            label="Leadership (About)"
            initialValues={objArr<{ name: string; role: string; bio: string; linkedin: string }>(
              data,
              "leadership",
            )}
            emptyRow={{ name: "", role: "", bio: "", linkedin: "" }}
            max={12}
            renderRow={(fieldName, row) => (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Input name={fieldName("name")} defaultValue={row.name} placeholder="Name" />
                  <Input name={fieldName("role")} defaultValue={row.role} placeholder="Role" />
                </div>
                <Textarea name={fieldName("bio")} defaultValue={row.bio} placeholder="Bio" />
                <Input
                  name={fieldName("linkedin")}
                  defaultValue={row.linkedin}
                  placeholder="LinkedIn URL"
                />
              </>
            )}
          />
          <RepeatableGroupList
            name="milestones"
            label="Milestones (About)"
            initialValues={objArr<{ year: string; event: string }>(data, "milestones")}
            emptyRow={{ year: "", event: "" }}
            max={20}
            renderRow={(fieldName, row) => (
              <div className="grid grid-cols-[1fr_3fr] gap-3">
                <Input name={fieldName("year")} defaultValue={row.year} placeholder="Year" />
                <Input name={fieldName("event")} defaultValue={row.event} placeholder="Event" />
              </div>
            )}
          />
          <RepeatableGroupList
            name="benefits"
            label="Benefits (Careers)"
            initialValues={objArr<{ title: string; body: string }>(data, "benefits")}
            emptyRow={{ title: "", body: "" }}
            max={10}
            renderRow={(fieldName, row) => (
              <>
                <Input name={fieldName("title")} defaultValue={row.title} placeholder="Title" />
                <Textarea name={fieldName("body")} defaultValue={row.body} placeholder="Body" />
              </>
            )}
          />
          <RepeatableGroupList
            name="hiringProcess"
            label="Hiring process (Careers)"
            initialValues={objArr<{ step: string; title: string; body: string }>(data, "hiringProcess")}
            emptyRow={{ step: "", title: "", body: "" }}
            max={10}
            renderRow={(fieldName, row) => (
              <>
                <div className="grid grid-cols-[1fr_3fr] gap-3">
                  <Input name={fieldName("step")} defaultValue={row.step} placeholder="Step" />
                  <Input name={fieldName("title")} defaultValue={row.title} placeholder="Title" />
                </div>
                <Textarea name={fieldName("body")} defaultValue={row.body} placeholder="Body" />
              </>
            )}
          />
          <RepeatableGroupList
            name="openings"
            label="Openings (Careers)"
            initialValues={objArr<{ title: string; location: string; type: string; summary: string }>(
              data,
              "openings",
            )}
            emptyRow={{ title: "", location: "", type: "", summary: "" }}
            max={20}
            renderRow={(fieldName, row) => (
              <>
                <div className="grid grid-cols-3 gap-3">
                  <Input name={fieldName("title")} defaultValue={row.title} placeholder="Title" />
                  <Input name={fieldName("location")} defaultValue={row.location} placeholder="Location" />
                  <Input name={fieldName("type")} defaultValue={row.type} placeholder="Type" />
                </div>
                <Textarea name={fieldName("summary")} defaultValue={row.summary} placeholder="Summary" />
              </>
            )}
          />
          <RepeatableGroupList
            name="techGroups"
            label="Tech groups (Technology)"
            initialValues={objArr<Record<string, unknown>>(data, "techGroups").map((group) => ({
              group: String(group.group ?? ""),
              body: String(group.body ?? ""),
              items: Array.isArray(group.items) ? (group.items as string[]).join(", ") : "",
            }))}
            emptyRow={{ group: "", body: "", items: "" }}
            max={10}
            renderRow={(fieldName, row) => (
              <>
                <Input name={fieldName("group")} defaultValue={row.group} placeholder="Group name" />
                <Textarea name={fieldName("body")} defaultValue={row.body} placeholder="Body" />
                <Input
                  name={fieldName("items")}
                  defaultValue={row.items}
                  placeholder="Comma-separated items"
                />
              </>
            )}
          />
          <RepeatableStringList
            name="expectations"
            label="Expectations (Contact)"
            initialValues={arr(data, "expectations")}
            max={10}
          />
        </>
      );

    case "navMenu":
      return (
        <>
          <Field label="Menu name" htmlFor="label" error={errors.label}>
            <Input id="label" name="label" defaultValue={str(data, "label")} required />
          </Field>
          <RepeatableGroupList
            name="items"
            label="Links"
            initialValues={objArr<{
              label: string;
              href: string;
              description: string;
              parent: string;
              group: string;
            }>(data, "items")}
            emptyRow={{ label: "", href: "", description: "", parent: "", group: "" }}
            max={30}
            renderRow={(fieldName, row) => (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Input name={fieldName("label")} defaultValue={row.label} placeholder="Label" />
                  <Input
                    name={fieldName("href")}
                    defaultValue={row.href}
                    placeholder="/about or https://…"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    name={fieldName("parent")}
                    defaultValue={row.parent}
                    placeholder="Parent (blank = top-level)"
                  />
                  <Input
                    name={fieldName("group")}
                    defaultValue={row.group}
                    placeholder="Column heading"
                  />
                </div>
                <Input
                  name={fieldName("description")}
                  defaultValue={row.description}
                  placeholder="Description (menu panels only)"
                />
              </>
            )}
          />
        </>
      );

    case "settings": {
      const contact = (data?.contact as Record<string, unknown> | undefined) ?? null;
      const promises = (data?.promises as Record<string, unknown> | undefined) ?? null;
      const social = (data?.social as Record<string, string> | undefined) ?? {};
      const header = (data?.header as Record<string, unknown> | undefined) ?? null;
      const footer = (data?.footer as Record<string, unknown> | undefined) ?? null;

      const headerFields = [
        ["ctaLabel", "Header button label"],
        ["promoHeading", "Menu promo — heading"],
        ["promoBody", "Menu promo — body"],
        ["promoCtaLabel", "Menu promo — link label"],
        ["promoCtaHref", "Menu promo — link target"],
        ["serviceGroupPrimary", "Services menu — first column"],
        ["serviceGroupSecondary", "Services menu — second column"],
        ["industryGroupPrimary", "Industries menu — first column"],
        ["industryGroupSecondary", "Industries menu — second column"],
      ] as const;

      const footerFields = [
        ["blurb", "Blurb after the tagline"],
        ["newsletterHeading", "Newsletter heading"],
        ["newsletterBody", "Newsletter body"],
        ["newsletterPlaceholder", "Newsletter input placeholder"],
        ["newsletterCtaLabel", "Newsletter button"],
        ["pagesHeading", "Pages column heading"],
        ["servicesHeading", "Services column heading"],
        ["officesHeading", "Offices column heading"],
        ["copyrightSuffix", "Copyright suffix"],
      ] as const;

      return (
        <>
          <Field label="Company name" htmlFor="name" error={errors.name}>
            <Input id="name" name="name" defaultValue={str(data, "name")} required />
          </Field>
          <Field label="Legal entity name" htmlFor="legalName" error={errors.legalName}>
            <Input id="legalName" name="legalName" defaultValue={str(data, "legalName")} required />
          </Field>
          <Field label="Tagline" htmlFor="tagline" error={errors.tagline}>
            <Input id="tagline" name="tagline" defaultValue={str(data, "tagline")} required />
          </Field>
          <Field label="Description" htmlFor="description" error={errors.description}>
            <Textarea id="description" name="description" defaultValue={str(data, "description")} required />
          </Field>
          <Field label="Founding year" htmlFor="foundingYear" error={errors.foundingYear}>
            <Input id="foundingYear" name="foundingYear" defaultValue={str(data, "foundingYear")} required />
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Contact email" htmlFor="contact.email" error={errors["contact.email"]}>
              <Input
                id="contact.email"
                name="contact.email"
                type="email"
                defaultValue={str(contact, "email")}
                required
              />
            </Field>
            <Field label="Phone (E.164)" htmlFor="contact.phone" error={errors["contact.phone"]}>
              <Input id="contact.phone" name="contact.phone" defaultValue={str(contact, "phone")} required />
            </Field>
            <Field
              label="Phone (display)"
              htmlFor="contact.phoneDisplay"
              error={errors["contact.phoneDisplay"]}
            >
              <Input
                id="contact.phoneDisplay"
                name="contact.phoneDisplay"
                defaultValue={str(contact, "phoneDisplay")}
                required
              />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Field
              label="Free consultation length"
              htmlFor="promises.consultationLength"
              error={errors["promises.consultationLength"]}
            >
              <Input
                id="promises.consultationLength"
                name="promises.consultationLength"
                defaultValue={str(promises, "consultationLength")}
                required
              />
            </Field>
            <Field
              label="Discovery length"
              htmlFor="promises.discoveryLength"
              error={errors["promises.discoveryLength"]}
            >
              <Input
                id="promises.discoveryLength"
                name="promises.discoveryLength"
                defaultValue={str(promises, "discoveryLength")}
                required
              />
            </Field>
            <Field
              label="Response time"
              htmlFor="promises.responseTime"
              error={errors["promises.responseTime"]}
            >
              <Input
                id="promises.responseTime"
                name="promises.responseTime"
                defaultValue={str(promises, "responseTime")}
                required
              />
            </Field>
          </div>

          <RepeatableGroupList
            name="offices"
            label="Offices"
            initialValues={objArr<Record<string, unknown>>(data, "offices").map((office) => ({
              label: String(office.label ?? ""),
              street: String(office.street ?? ""),
              city: String(office.city ?? ""),
              region: String(office.region ?? ""),
              postalCode: String(office.postalCode ?? ""),
              country: String(office.country ?? ""),
              phone: String(office.phone ?? ""),
              phoneDisplay: String(office.phoneDisplay ?? ""),
            }))}
            emptyRow={{
              label: "",
              street: "",
              city: "",
              region: "",
              postalCode: "",
              country: "",
              phone: "",
              phoneDisplay: "",
            }}
            max={6}
            renderRow={(fieldName, row) => (
              <>
                <Input name={fieldName("label")} defaultValue={row.label} placeholder="Label" />
                <Input name={fieldName("street")} defaultValue={row.street} placeholder="Street" />
                <div className="grid grid-cols-2 gap-3">
                  <Input name={fieldName("city")} defaultValue={row.city} placeholder="City" />
                  <Input name={fieldName("region")} defaultValue={row.region} placeholder="Region" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    name={fieldName("postalCode")}
                    defaultValue={row.postalCode}
                    placeholder="Postal code"
                  />
                  <Input
                    name={fieldName("country")}
                    defaultValue={row.country}
                    placeholder="Country (ISO-2)"
                    maxLength={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input name={fieldName("phone")} defaultValue={row.phone} placeholder="Phone (E.164)" />
                  <Input
                    name={fieldName("phoneDisplay")}
                    defaultValue={row.phoneDisplay}
                    placeholder="Phone (display)"
                  />
                </div>
              </>
            )}
          />

          <RepeatableGroupList
            name="social"
            label="Social links"
            initialValues={Object.entries(social).map(([platform, url]) => ({ platform, url }))}
            emptyRow={{ platform: "", url: "" }}
            renderRow={(fieldName, row) => (
              <div className="grid grid-cols-[1fr_2fr] gap-3">
                <Input name={fieldName("platform")} defaultValue={row.platform} placeholder="Platform" />
                <Input name={fieldName("url")} defaultValue={row.url} placeholder="https://…" />
              </div>
            )}
          />

          <RepeatableGroupList
            name="stats"
            label="Stats"
            initialValues={objArr<{ value: string; label: string }>(data, "stats")}
            emptyRow={{ value: "", label: "" }}
            max={4}
            renderRow={(fieldName, row) => (
              <div className="grid grid-cols-[1fr_2fr] gap-3">
                <Input name={fieldName("value")} defaultValue={row.value} placeholder="Value" />
                <Input name={fieldName("label")} defaultValue={row.label} placeholder="Label" />
              </div>
            )}
          />

          <RepeatableStringList
            name="credentials"
            label="Credentials"
            initialValues={arr(data, "credentials")}
            max={8}
          />
          <RepeatableStringList
            name="platformStrip"
            label="Platform strip"
            initialValues={arr(data, "platformStrip")}
            max={16}
          />

          <fieldset className="rounded-2xl border border-ink-200 p-5">
            <legend className="px-2 text-sm font-semibold text-ink-900">Header</legend>
            <div className="space-y-4">
              {headerFields.map(([key, label]) => (
                <Field key={key} label={label} htmlFor={`header.${key}`}>
                  <Input
                    id={`header.${key}`}
                    name={`header.${key}`}
                    defaultValue={str(header, key)}
                  />
                </Field>
              ))}
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-ink-200 p-5">
            <legend className="px-2 text-sm font-semibold text-ink-900">Footer</legend>
            <div className="space-y-4">
              {footerFields.map(([key, label]) => (
                <Field key={key} label={label} htmlFor={`footer.${key}`}>
                  <Input
                    id={`footer.${key}`}
                    name={`footer.${key}`}
                    defaultValue={str(footer, key)}
                  />
                </Field>
              ))}
            </div>
          </fieldset>
        </>
      );
    }

    default: {
      const exhaustive: never = collection;
      throw new Error(`Unhandled collection: ${exhaustive}`);
    }
  }
}
