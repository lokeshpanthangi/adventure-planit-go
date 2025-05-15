
import { Layout } from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Calendar, Settings } from "lucide-react";

const ProfilePage = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold">Jane Doe</h1>
            <p className="text-muted-foreground">
              Adventure seeker and world traveler
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" /> Preferences
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Trip Statistics</CardTitle>
              <CardDescription>Your travel overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Map className="mr-2 h-5 w-5 text-primary-light dark:text-primary-dark" />
                  <span>Total Trips</span>
                </div>
                <span className="font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary-light dark:text-primary-dark" />
                  <span>Upcoming Trips</span>
                </div>
                <span className="font-bold">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Map className="mr-2 h-5 w-5 text-primary-light dark:text-primary-dark" />
                  <span>Countries Visited</span>
                </div>
                <span className="font-bold">8</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Travel Preferences</CardTitle>
              <CardDescription>Your favorite trip types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <div className="rounded-full bg-secondary/20 px-3 py-1 text-sm text-secondary-foreground">
                  Beach
                </div>
                <div className="rounded-full bg-accent/20 px-3 py-1 text-sm text-accent-foreground">
                  Mountains
                </div>
                <div className="rounded-full bg-primary/20 px-3 py-1 text-sm text-primary-foreground">
                  City
                </div>
                <div className="rounded-full bg-secondary/20 px-3 py-1 text-sm text-secondary-foreground">
                  Cultural
                </div>
                <div className="rounded-full bg-accent/20 px-3 py-1 text-sm text-accent-foreground">
                  Food
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
