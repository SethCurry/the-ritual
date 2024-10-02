import ScryfallCard from "../../../lib/mtg/scryfall/responses/ScryfallCard";

export interface CardItemProps {
  card: ScryfallCard;
}

function getCardImage(card: ScryfallCard) {
  if (!card.image_uris) {
    return "";
  }

  const uris = card.image_uris;

  if (uris.large) {
    return uris.large;
  }

  if (uris.normal) {
    return uris.normal;
  }

  if (uris.small) {
    return uris.small;
  }

  if (uris.png) {
    return uris.png;
  }

  if (uris.art_crop) {
    return uris.art_crop;
  }

  if (uris.border_crop) {
    return uris.border_crop;
  }

  return "";
}

export default function CardItem({ card }: CardItemProps) {
  return (
    <div style={{ flexShrink: 1 }}>
      <img width="100%" src={getCardImage(card)} />
    </div>
  );
}
