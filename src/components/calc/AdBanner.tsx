export default function AdBanner({ slot = "top" }: { slot?: string }) {
  return (
    <div className="my-6 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {/* Google AdSense ad unit */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-7878398091851771"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}