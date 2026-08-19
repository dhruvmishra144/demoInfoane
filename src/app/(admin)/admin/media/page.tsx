import { requireUser } from "@/server/auth/guards";
import { getAllMedia } from "@/server/media/read";
import { MediaUploadForm } from "./MediaUploadForm";
import { MediaGridItem } from "./MediaGridItem";

export const metadata = { title: { absolute: "Media | Infotech Admin" } };

export default async function MediaLibraryPage() {
  await requireUser("/admin/media");
  const assets = await getAllMedia();

  return (
    <div>
      <header>
        <h1 className="text-2xl font-semibold text-ink-900">Media</h1>
        <p className="mt-1.5 text-sm text-ink-500">
          {assets.length} {assets.length === 1 ? "asset" : "assets"} — used for case study and
          testimonial images via their Media asset ID field.
        </p>
      </header>

      <div className="mt-6">
        <MediaUploadForm />
      </div>

      <div className="mt-6">
        {assets.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-ink-200 p-8 text-center text-sm text-ink-500">
            Nothing uploaded yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {assets.map((asset) => (
              <div key={asset.id}>
                <MediaGridItem
                  id={asset.id}
                  url={asset.url}
                  filename={asset.filename}
                  altText={asset.altText}
                />
                <p className="mt-1.5 truncate text-[11px] text-ink-400" title={asset.id}>
                  ID: {asset.id}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
