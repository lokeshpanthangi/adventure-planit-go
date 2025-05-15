
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Map, Calendar, Settings, Camera, Edit, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Jane Doe",
    username: "janedoe",
    email: "jane@example.com",
    bio: "Adventure seeker and world traveler",
    location: "San Francisco, CA",
    coverPhoto: "https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    avatar: "https://github.com/shadcn.png",
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const tripStats = [
    { label: "Total Trips", value: 12, icon: Map },
    { label: "Upcoming Trips", value: 3, icon: Calendar },
    { label: "Countries Visited", value: 8, icon: MapPin },
  ];

  const travelPreferences = [
    "Beach", "Mountains", "City", "Cultural", "Food", 
    "Adventure", "Relaxation", "History", "Nature", "Photography"
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Profile Header with Cover Photo */}
        <div className="relative overflow-hidden rounded-xl">
          <AspectRatio ratio={5/2}>
            <img
              src={profileData.coverPhoto}
              alt="Cover"
              className="object-cover w-full"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm hover:bg-background/70"
            onClick={() => toast({ title: "Feature coming soon", description: "Cover photo upload will be available soon." })}
          >
            <Camera className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-0 left-0 p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-end gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback>{profileData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-background shadow"
                onClick={() => toast({ title: "Feature coming soon", description: "Avatar upload will be available soon." })}
              >
                <Camera className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-foreground">{profileData.name}</h1>
              <p className="text-muted-foreground">@{profileData.username}</p>
              {profileData.location && (
                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{profileData.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input 
                        id="name" 
                        value={profileData.name} 
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="username" className="text-sm font-medium">Username</label>
                      <Input 
                        id="username" 
                        value={profileData.username} 
                        onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileData.email} 
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="location" className="text-sm font-medium">Location</label>
                      <Input 
                        id="location" 
                        value={profileData.location} 
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                    <Textarea 
                      id="bio" 
                      value={profileData.bio} 
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="flex justify-between items-start">
                <div className="max-w-lg">
                  <h2 className="text-xl font-semibold mb-2">About</h2>
                  <p className="text-muted-foreground">{profileData.bio}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            )}

            {/* Trip Statistics */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Trip Statistics</CardTitle>
                  <CardDescription>Your travel overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tripStats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <stat.icon className="mr-2 h-5 w-5 text-primary-light dark:text-primary-dark" />
                        <span>{stat.label}</span>
                      </div>
                      <span className="font-bold">{stat.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Travel Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Travel Preferences</CardTitle>
                  <CardDescription>Your favorite trip types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {travelPreferences.map((pref) => (
                      <div 
                        key={pref}
                        className="rounded-full bg-secondary/20 px-3 py-1 text-sm text-secondary-foreground"
                      >
                        {pref}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trips">
            <Card>
              <CardHeader>
                <CardTitle>My Trips</CardTitle>
                <CardDescription>Your travel history and future plans</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Your trips will appear here. Get started by creating your first trip!
                  </p>
                  <Button>Create Trip</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>Memories from your travels</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Your travel photos will appear here. Upload some from your trips!
                  </p>
                  <Button>Upload Photos</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Notifications & Preferences</CardTitle>
                <CardDescription>Manage how Planit works for you</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Notification preferences and settings coming soon!
                  </p>
                  <Button disabled>Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProfilePage;
