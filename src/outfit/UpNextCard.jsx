// Placeholder card shown for outfits that come after the active one.
export default function UpNextCard({ outfitNumber }) {
  return (
    <div className="ob-upnext">
      <div className="ob-upnext-num">0{outfitNumber}</div>
      <div className="ob-upnext-text">coming up</div>
    </div>
  );
}
