import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchData, getPlayerProfile } from '@/api';
import type { IPlayerCountry, IPlayerProfile } from '@/types/api';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import useTimeSince from '@/hooks/useTimeSince';


const GrandmastersListButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="secondary"
      onClick={() => navigate('/')}
      className="text-xs sm:text-sm hover:cursor-pointer mx-auto px-3 sm:px-4 py-1 sm:py-2"
    >
      Go to Grandmasters List
    </Button>
  )
}

function PlayerProfile() {
  const { username } = useParams();
  const navigate = useNavigate();

  const { data: player, isLoading, error } = useQuery<IPlayerProfile>({
    queryKey: ['player', username],
    queryFn: () => getPlayerProfile(username || ''),
    enabled: !!username,
  });

  const { data: countryData, isLoading: countryLoading, error: countryError } = useQuery<IPlayerCountry>({
    queryKey: ['country', player?.country],
    queryFn: () => fetchData<IPlayerCountry>(player?.country || ''),
    enabled: !!player?.country,
  });

  const timeSinceLastOnline: string = useTimeSince(player?.last_online || 0);

  if (!username) {
    navigate('/');
  }

  if (isLoading || countryLoading) return <div>Loading...</div>;

  const errorMessage = error?.message || countryError?.message;

  if (errorMessage) {
    if (errorMessage.includes('404')) {
      return (
        <Card className="w-full max-w-[400px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Player not found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base">The player you are looking for does not exist.</p>
          </CardContent>
          <CardFooter>
            <GrandmastersListButton />
          </CardFooter>
        </Card>
      )
    }

    return (
      <Card className="w-full max-w-[400px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base">An error occurred while fetching the player profile.</p>
        </CardContent>
        <CardFooter>
          <GrandmastersListButton />
        </CardFooter>
      </Card>
    )
  }

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
        <GrandmastersListButton />
      </CardFooter>
    </Card>
  )
}

export default PlayerProfile;