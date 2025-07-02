import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchData, getPlayerProfile } from '@/api';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import useTimeSince from '@/hooks/useTimeSince';

function PlayerProfile() {
  const { username } = useParams();
  const navigate = useNavigate();

  const { data: player, isLoading, error } = useQuery({
    queryKey: ['player', username],
    queryFn: () => getPlayerProfile(username || ''),
    enabled: !!username,
  });

  const { data: countryData, isLoading: countryLoading, error: countryError } = useQuery({
    queryKey: ['country', player?.country],
    queryFn: () => fetchData(player?.country),
    enabled: !!player?.country,
  });

  const timeSinceLastOnline = useTimeSince(player?.last_online);

  if (!username) {
    navigate('/');
  }

  if (isLoading || countryLoading) return <div>Loading...</div>;
  if (error || countryError) return <div>Error: {error?.message || countryError?.message}</div>;

  if (!player) return <div>No player found</div>;

  return (
    <Card className="w-full max-w-[400px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{player.username} {player.title && <span className="text-sm sm:text-base text-muted-foreground">({player.title})</span>}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <dl className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center">
            <dt className="font-medium text-muted-foreground text-sm sm:text-base">Country</dt>
            <dd className="text-right text-sm sm:text-base">{countryData?.name}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="font-medium text-muted-foreground text-sm sm:text-base">Followers</dt>
            <dd className="text-right text-sm sm:text-base">{player.followers}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="font-medium text-muted-foreground text-sm sm:text-base">League</dt>
            <dd className="text-right text-sm sm:text-base">{player.league}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="font-medium text-muted-foreground text-sm sm:text-base">Status</dt>
            <dd className="text-right text-sm sm:text-base capitalize">{player.status}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="font-medium text-muted-foreground text-sm sm:text-base">Verified</dt>
            <dd className="text-right text-sm sm:text-base">{player.verified ? 'Yes' : 'No'}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="font-medium text-muted-foreground text-sm sm:text-base">Streamer</dt>
            <dd className="text-right text-sm sm:text-base">{player.is_streamer ? 'Yes' : 'No'}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="font-medium text-muted-foreground text-sm sm:text-base">Joined</dt>
            <dd className="text-right text-sm sm:text-base">{new Date(player.joined * 1000).toLocaleDateString()}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="font-medium text-muted-foreground text-sm sm:text-base">Last Online</dt>
            <dd className="text-right text-sm sm:text-base">{timeSinceLastOnline}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="font-medium text-muted-foreground text-sm sm:text-base">Profile</dt>
            <dd className="text-right">
              <a
                href={player.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm sm:text-base"
              >
                View Profile
              </a>
            </dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter>
        <Button
          variant="secondary"
          onClick={() => navigate('/')}
          className="text-xs sm:text-sm hover:cursor-pointer mx-auto px-3 sm:px-4 py-1 sm:py-2"
        >
          Go to Grandmasters List
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PlayerProfile;