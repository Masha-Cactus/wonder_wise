"use client";

import { memo } from "react";
import { ProfileInfo } from "@/src/components/organisms";
import {
  RecentlyLikedSection,
  RecentlyReviewsSection,
} from "@/src/components/organisms";
import { Divider } from "@/src/components/atoms";


const ProfilePage: React.FC = () => {
  return (
    <section className="h-full w-full">
      <Divider />
      <div 
        className="grid h-full w-full grid-cols-[380px,1fr] 
        justify-center gap-9 overflow-y-auto px-10 py-8"
      >
        <ProfileInfo />

        <div className="flex min-w-0 flex-col gap-6">
          <RecentlyLikedSection />

          <RecentlyReviewsSection />
        </div>
      </div>
    </section>
  );
};

export default memo(ProfilePage);
