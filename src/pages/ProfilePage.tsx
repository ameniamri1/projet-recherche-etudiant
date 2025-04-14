
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Save, User, Lock, Bell, Award, Trash2, LogOut, Mail, Phone, FileEdit, Key, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const { toast } = useToast();
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Smith",
    email: "john.smith@university.edu",
    phone: "+1 (555) 123-4567",
    role: "student", // or "teacher"
    department: "Computer Science",
    year: "3rd Year",
    bio: "Computer Science student with a focus on machine learning and data analysis. Looking for research opportunities in AI and natural language processing.",
    skills: ["Python", "Machine Learning", "Data Analysis", "JavaScript", "SQL"],
    avatarUrl: ""
  });
  
  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailApplicationUpdates: true,
    emailNewTopics: true,
    emailMessages: true,
    pushApplicationUpdates: true,
    pushNewTopics: false,
    pushMessages: true
  });
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    // Here you would reset the form to the original data
    setIsEditing(false);
  };
  
  const handleChangeNotificationSetting = (key: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value
    });
    
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved",
    });
  };
  
  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog first
    toast({
      title: "Account deletion requested",
      description: "Please check your email to confirm account deletion",
    });
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.header 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <User className="h-6 w-6 text-indigo-600" />
            <h1 className="text-3xl font-bold text-indigo-800">Profile</h1>
          </div>
          <p className="text-gray-600">Manage your personal information and account settings</p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Summary Card */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="bg-white shadow-sm border-gray-200">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-800 text-xl">
                    {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-xl text-gray-800">{userData.name}</h3>
                <p className="text-gray-500 mb-2">{userData.email}</p>
                <Badge className={userData.role === "student" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}>
                  {userData.role === "student" ? "Student" : "Teacher"}
                </Badge>
                
                <div className="w-full border-t border-gray-100 mt-6 pt-4">
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Department:</span>
                      <span className="text-sm font-medium">{userData.department}</span>
                    </div>
                    {userData.role === "student" && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Year:</span>
                        <span className="text-sm font-medium">{userData.year}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Account Type:</span>
                      <span className="text-sm font-medium capitalize">{userData.role}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="mt-6 w-full gap-1" 
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="h-4 w-4" /> Edit Profile
                </Button>
              </CardContent>
            </Card>
            
            <Card className="mt-6 bg-white shadow-sm border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-indigo-600" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main content area */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="bg-white shadow-sm border-gray-200">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full bg-gray-50 border-b rounded-none">
                  <TabsTrigger 
                    value="personal" 
                    className="data-[state=active]:bg-white rounded-b-none border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="data-[state=active]:bg-white rounded-b-none border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="data-[state=active]:bg-white rounded-b-none border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                </TabsList>
                
                {/* Personal Info Tab */}
                <TabsContent value="personal" className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {isEditing ? "Edit Your Information" : "Personal Information"}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {isEditing 
                          ? "Update your personal details below" 
                          : "Your personal details and contact information"}
                      </p>
                    </div>
                    
                    <div className="pt-4 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          {isEditing ? (
                            <Input 
                              id="name" 
                              value={userData.name} 
                              onChange={(e) => setUserData({...userData, name: e.target.value})}
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-gray-50">{userData.name}</div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          {isEditing ? (
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input 
                                id="email" 
                                value={userData.email} 
                                onChange={(e) => setUserData({...userData, email: e.target.value})}
                                className="pl-10"
                              />
                            </div>
                          ) : (
                            <div className="p-2 border rounded-md bg-gray-50 flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span>{userData.email}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          {isEditing ? (
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input 
                                id="phone" 
                                value={userData.phone} 
                                onChange={(e) => setUserData({...userData, phone: e.target.value})}
                                className="pl-10"
                              />
                            </div>
                          ) : (
                            <div className="p-2 border rounded-md bg-gray-50 flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span>{userData.phone}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          {userData.role === "student" ? (
                            <>
                              <Label htmlFor="year">Year of Study</Label>
                              {isEditing ? (
                                <Select 
                                  value={userData.year} 
                                  onValueChange={(value) => setUserData({...userData, year: value})}
                                >
                                  <SelectTrigger id="year">
                                    <SelectValue placeholder="Select year" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1st Year">1st Year</SelectItem>
                                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                                    <SelectItem value="4th Year">4th Year</SelectItem>
                                    <SelectItem value="5th Year">5th Year</SelectItem>
                                    <SelectItem value="Graduate">Graduate</SelectItem>
                                  </SelectContent>
                                </Select>
                              ) : (
                                <div className="p-2 border rounded-md bg-gray-50">{userData.year}</div>
                              )}
                            </>
                          ) : (
                            <>
                              <Label htmlFor="title">Title</Label>
                              {isEditing ? (
                                <Select 
                                  value={"Professor"} 
                                  onValueChange={() => {}}
                                >
                                  <SelectTrigger id="title">
                                    <SelectValue placeholder="Select title" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Professor">Professor</SelectItem>
                                    <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                                    <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                                    <SelectItem value="Lecturer">Lecturer</SelectItem>
                                    <SelectItem value="Researcher">Researcher</SelectItem>
                                  </SelectContent>
                                </Select>
                              ) : (
                                <div className="p-2 border rounded-md bg-gray-50">Professor</div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        {isEditing ? (
                          <Select 
                            value={userData.department} 
                            onValueChange={(value) => setUserData({...userData, department: value})}
                          >
                            <SelectTrigger id="department">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Computer Science">Computer Science</SelectItem>
                              <SelectItem value="Mathematics">Mathematics</SelectItem>
                              <SelectItem value="Physics">Physics</SelectItem>
                              <SelectItem value="Biology">Biology</SelectItem>
                              <SelectItem value="Engineering">Engineering</SelectItem>
                              <SelectItem value="Psychology">Psychology</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{userData.department}</div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        {isEditing ? (
                          <Textarea
                            id="bio"
                            placeholder="Tell us about yourself..."
                            value={userData.bio}
                            onChange={(e) => setUserData({...userData, bio: e.target.value})}
                            className="resize-none"
                            rows={4}
                          />
                        ) : (
                          <div className="p-3 border rounded-md bg-gray-50 min-h-24">
                            {userData.bio}
                          </div>
                        )}
                      </div>
                      
                      {isEditing && (
                        <div className="space-y-2">
                          <Label htmlFor="avatar">Profile Picture</Label>
                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                            <Input
                              id="avatar"
                              type="file"
                              accept="image/*"
                              className="hidden"
                            />
                            <Label htmlFor="avatar" className="cursor-pointer">
                              <div className="flex flex-col items-center">
                                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                <p className="text-gray-700 font-medium">
                                  Drop a file here or <span className="text-indigo-600">browse</span>
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  PNG, JPG up to 5MB
                                </p>
                              </div>
                            </Label>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {isEditing ? (
                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                        <Button className="gap-1 bg-indigo-600 hover:bg-indigo-700" onClick={handleSaveProfile}>
                          <Save className="h-4 w-4" /> Save Changes
                        </Button>
                      </div>
                    ) : (
                      <div className="pt-4 border-t">
                        <Button 
                          className="gap-1"
                          onClick={() => setIsEditing(true)}
                        >
                          <FileEdit className="h-4 w-4" /> Edit Profile
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                {/* Notifications Tab */}
                <TabsContent value="notifications" className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>
                      <p className="text-sm text-gray-600">
                        Control how you receive notifications about applications, messages, and new topics
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800 mb-3">Email Notifications</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Application Updates</Label>
                                <p className="text-sm text-gray-500">
                                  Receive emails about the status of your applications
                                </p>
                              </div>
                              <Switch 
                                checked={notificationSettings.emailApplicationUpdates}
                                onCheckedChange={(checked) => handleChangeNotificationSetting('emailApplicationUpdates', checked)}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">New Research Topics</Label>
                                <p className="text-sm text-gray-500">
                                  Receive emails when new research topics are published
                                </p>
                              </div>
                              <Switch 
                                checked={notificationSettings.emailNewTopics}
                                onCheckedChange={(checked) => handleChangeNotificationSetting('emailNewTopics', checked)}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Messages</Label>
                                <p className="text-sm text-gray-500">
                                  Receive emails when you get a new message
                                </p>
                              </div>
                              <Switch 
                                checked={notificationSettings.emailMessages}
                                onCheckedChange={(checked) => handleChangeNotificationSetting('emailMessages', checked)}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-gray-800 mb-3">Push Notifications</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Application Updates</Label>
                                <p className="text-sm text-gray-500">
                                  Receive push notifications about the status of your applications
                                </p>
                              </div>
                              <Switch 
                                checked={notificationSettings.pushApplicationUpdates}
                                onCheckedChange={(checked) => handleChangeNotificationSetting('pushApplicationUpdates', checked)}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">New Research Topics</Label>
                                <p className="text-sm text-gray-500">
                                  Receive push notifications when new research topics are published
                                </p>
                              </div>
                              <Switch 
                                checked={notificationSettings.pushNewTopics}
                                onCheckedChange={(checked) => handleChangeNotificationSetting('pushNewTopics', checked)}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Messages</Label>
                                <p className="text-sm text-gray-500">
                                  Receive push notifications when you get a new message
                                </p>
                              </div>
                              <Switch 
                                checked={notificationSettings.pushMessages}
                                onCheckedChange={(checked) => handleChangeNotificationSetting('pushMessages', checked)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Security Tab */}
                <TabsContent value="security" className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
                      <p className="text-sm text-gray-600">
                        Manage your account security and privacy settings
                      </p>
                    </div>
                    
                    <div className="pt-4 space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center gap-2">
                          <Key className="h-5 w-5 text-indigo-600" />
                          Password
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          It's a good idea to use a strong password that you're not using elsewhere
                        </p>
                        <Button className="gap-1">
                          <Lock className="h-4 w-4" /> Change Password
                        </Button>
                      </div>
                      
                      <div className="pt-6 border-t space-y-5">
                        <h3 className="text-lg font-medium text-gray-800">Account Management</h3>
                        
                        <Button variant="outline" className="w-full justify-start text-gray-700">
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out from all devices
                        </Button>
                        
                        <div className="pt-4 border-t">
                          <h3 className="text-lg font-medium text-red-600 mb-3">Danger Zone</h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                          <Button 
                            variant="destructive" 
                            className="gap-1"
                            onClick={handleDeleteAccount}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
