# DAYONE — Netlify-only training journal (v2.1)

A 100-day mobile-first, installable PWA for the program beginning **Monday, 26 October 2026**, ending **Tuesday, 2 February 2027**.

## What is included

- 100-day calendar, five phases, workout cards, sets/reps/kg, session logs, rest timer, checklists, cardio, nutrition and personal notes.
- Body-weight chart, waist/chest/arms/hips metrics, daily notes, and front/side/back progress photos with automatic pose-based 2D alignment, overlay reveal and side-by-side comparison.
- **Apple Health XML export import** for course-period weight, steps, active energy, heart-rate samples and sleep. Import is manual. No direct HealthKit API is available to Safari/PWAs. Apple Health exports XML within a ZIP; extract `export.xml` first. Totals derived from raw records may differ from Apple's summaries because of overlapping device samples.
- Device-first/offline storage; optional single-user backup/sync with Netlify **Functions + Blobs**, with password-like environment variable (`DAYONE_SYNC_KEY`). No Firebase or paid database.
- Course workouts are transcribed from supplied resource PDFs. Videos/transcripts were not verified. Course documents are intentionally **not** publicly bundled here; reference buttons point to the original course portal. The Peak Week safety caveats remain.

## Publish (Netlify Free)

### Recommended: Netlify Drop when signed in

1. Create/sign in to a **free Netlify account**.
2. Upload the **full source folder** or ZIP (containing `package.json`, `netlify.toml`, `site/` and `netlify/functions/`) at https://app.netlify.com/drop . You must be signed in for Netlify to run the build. **Do not upload just the `site/` folder**: that deploys only the offline app without your cloud function.
3. Once a project is created, open **Project configuration → Environment variables**. Create `DAYONE_SYNC_KEY` with a unique random value **at least 20 characters long**, e.g. a password manager generated 32+ character string. Set it for Functions; do not put it into source code.
4. **Redeploy** from source after setting the environment variable so the Function picks it up.
5. Open `https://YOUR-PROJECT.netlify.app/.netlify/functions/dayone-api` in a browser. A **401** response indicates the function is deployed and requires authorization (expected). **503** means the key is unset or too short. **404** means the Functions were not deployed; repeat with a full Netlify build or use the CLI method below.
6. Open your site → **Settings** → **Netlify Blobs sync**, enter the same `DAYONE_SYNC_KEY` and select *Connect & merge*. Enter it on your iPhone and PC. Tick *Remember key* only on your private devices.
7. Install on iPhone via Safari → Share → Add to Home Screen. Use in the gym even offline; online changes sync to the same Netlify site.

### Reliable CLI alternative (still Netlify only, no GitHub)

1. Install free Node.js v22 LTS and extract this folder on your PC.
2. In PowerShell in the extracted folder:

   ```powershell
   npm install
   npx netlify-cli login
   npx netlify-cli deploy --prod
   ```

   Follow the Netlify prompts to link or create your free site. The CLI deploy command builds and uploads the `site/` files **and** the `netlify/functions/` code. Set the secret environment variable and redeploy as above.

## Photo comparison: automatic alignment (new in v2.1)

1. Open **Progress → Photo comparison**. Take or upload photos for **Day 1** and another day, matching the angle (front, side or back).
2. Both images loading triggers **Auto align** automatically, if the detection model is available. You can also tap **Auto align** to retry. The app matches shoulders/hips and adjusts **translation, uniform scale and tilt** of the *displayed after image* against the before image.
3. In **Overlay** mode, scrub the reveal slider to see changes at the same position. Switch to **Side by side** to see each original without alignment. In Overlay mode, **drag the photo** to move it, or open **Fine-tune alignment** to adjust zoom, horizontal/vertical shift and tilt. **Reset** restores the original framing.
4. Your adjustments save for that before/after day and angle. They **also sync through Netlify Blobs** if your existing private Netlify sync is connected. Original JPG photos are never edited, stretched or overwritten. **Photos themselves** still sync using your Netlify Blobs configuration.

**Limitations:** Real viewpoint changes, lens distortion, perspective (low/high camera), twisting, posture, different front/side orientations, tight crops, or missing limbs cannot be reliably corrected by 2D positioning. If a reliable body cannot be detected, manually adjust or retake from a similar height, distance and stance. Do not use automatic alignment as proof of changes to body fat or circumference.

**No paid AI service:** On a normal Netlify source build, the free open-source MediaPipe library and model are copied/downloaded to your own Netlify static site during the build, for local inference on iPhone/browser. If optional bundling fails or you deploy static files without a build, the browser downloads the same free runtime/model from jsDelivr/Google when you first use Auto align; this needs internet. No photos are submitted to these hosts for model inference. MediaPipe's distribution notices state it may transmit software performance/usage metrics. The app makes no subscription or server-side photo-analysis API calls. An aligned view can work offline after the model/runtime have been cached.

## Apple Health steps

- iPhone **Health** app → tap profile photo → **Export All Health Data** → save ZIP to Files.
- In Files, unzip, open the DAYONE **Progress** page, tap **Import export.xml**, select extracted `export.xml`.
- Import is **read-only, manual**, not continuous. No HealthKit or Apple Watch live sync from Safari/PWA. The file remains on your phone, and **only imported summaries** are put into Blobs if you explicitly enable cloud sync.
- If you need to refresh the metrics, repeat the export/import; new snapshots replace earlier imported summaries for matching dates.

## Data protection & expectations

- App pages are public by default. Logs and photos in Blobs are **not exposed via public URLs**: the API requires `DAYONE_SYNC_KEY` on **every** read/write. The key is sent over HTTPS. Anyone who knows the key can read/change the backed-up data. The app is intended for **one person**, not a multi-user service.
- Netlify encrypts Blobs at rest/in transit. Sensitive information is still accessible to the owner of the Netlify site, so do not use this app as a regulated medical record store. Keep the secret out of public repositories.
- Photos save separately in browser IndexedDB; the JSON backup **does not include** photo binaries. Photos are synced to private Netlify Blobs when connected, including pending photos from offline sessions after reconnecting.
- If multiple devices edit **the same day simultaneously**, last-edit timestamp wins when merging; simultaneous conflicts can still occur. This is personal-use sync, not transactional multi-user editing.
- Free Netlify storage/functions use Netlify's **monthly credits and quotas**, not unlimited storage. Photos are optimized as JPEG to limit use. Stay on the free plan; Netlify Free has a hard stop rather than automatic paid overages (review your usage in the Netlify dashboard).
- No service credentials or course passwords are required or embedded.
- The PWA caches only static app assets and locally hosted public pose-model files, not private Function responses.

## Source references

- `data.js` holds course-derived exercise assignments.
- `course-register.json` indexes available course lessons and PDFs for mapping.
- Source videos and transcripts were not accessible or fully verified. Do not treat their absence as proof the course gives no further instructions. User-supplied PDF-based instructions are differentiated from the app's optional progress fields.
- Peak Week hydration/sodium contradictions must be resolved with a qualified clinician/coach, not followed automatically.

## Files

- `site/`: installable PWA static assets and course schedule; no licensed PDFs distributed.
- `netlify/functions/dayone-api.mjs`: protected GET/PUT user log and photos using Netlify Blobs.
- `netlify.toml`: Netlify build and Functions directory.
- `package.json`: dependencies on `@netlify/blobs` and free `@mediapipe/tasks-vision`.
- `scripts/prepare-pose.mjs`: optional no-cost, build-time self-hosting of the pose model and runtime (with free CDN fallback).
- `site/photo-align.js`: registration math and local pose detection; comparison controls live in `site/app.js`.

**Note:** This ZIP is source code ready for deployment; the Netlify Function hasn't been executed on your account and cloud backup remains unconfigured until you supply a private key there.
