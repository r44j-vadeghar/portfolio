import Image from "next/image";
import { PropsWithChildren } from "react";
import { useFeatureStore } from "./feature-store";

type CardProps = {
  id: string;
};

function FeaturedCard({
  children,
  gradient,
  id,
}: PropsWithChildren &
  CardProps & {
    gradient: string;
  }) {
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);

  return (
    <div
      className={`absolute inset-0 h-full w-full rounded-2xl transition-opacity ${
        inViewFeature === id
          ? "active-card opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`gradient absolute inset-0 origin-bottom-left rounded-2xl bg-gradient-to-br ${gradient}`}
      />
      {children}
    </div>
  );
}
export default FeaturedCard;

export const ManifoldVentures = ({ id }: CardProps) => {
  return (
    <FeaturedCard id={id} gradient="from-[#f7f0ff] to-[#a78afe]">
      <div className="relative h-full w-full">
        <Image
          src={"/assets/featured/startup-work.png"}
          alt={id}
          fill
          className="object-cover rounded-md"
        />
      </div>
    </FeaturedCard>
  );
};

export const TCS = ({ id }: CardProps) => {
  return (
    <FeaturedCard id={id} gradient="from-[#f5fbff] to-[#addeff]">
      <div className="relative h-full w-full">
        <Image
          src={"/assets/featured/tcs-work.jpeg"}
          alt={id}
          fill
          className="object-cover rounded-md"
        />
      </div>
    </FeaturedCard>
  );
};

export const RjYoutube = ({ id }: CardProps) => {
  return (
    <FeaturedCard id={id} gradient="from-[#f5fff7] to-[#adf8ff]">
      <div className="relative h-full w-full">
        <Image
          src={"/assets/featured/youtube-content.png"}
          alt={id}
          fill
          className="object-cover rounded-md"
        />
      </div>
    </FeaturedCard>
  );
};
