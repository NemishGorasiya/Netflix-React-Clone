import React, { useState } from "react";
import SeasonsList from "./SeasonsList";
import SeasonEpisodes from "./SeasonEpisodes";
import { fetchEpisodes } from "../../services/services";
import { useSearchParams } from "react-router-dom";

const TvSeasonsWrapper = ({ mediaId }) => {
  const [searchParams] = useSearchParams();
  const seasonNumber = searchParams.get("season");
  return (
    <>
      <SeasonsList seriesId={mediaId} />
      {seasonNumber && (
        <SeasonEpisodes seasonNumber={seasonNumber} mediaId={mediaId} />
      )}
    </>
  );
};

export default TvSeasonsWrapper;
