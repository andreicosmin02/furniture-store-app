import Button from "@/app/components/Button";
import TopBar from "@/app/components/TopBar";
import Colors from "@/app/constants/Colors";
import { useAuthStore } from "@/app/data/authStore";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { useProductCustomizationStore } from '@/app/data/productCustomizationStore';
import { useGenerateRoomStore } from '@/app/data/generateRoomStore';
import { useCartStore } from '@/app/data/cartStore';

export default function Account() {
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const isAdminOrEmployee = userData?.role === 'admin' || userData?.role === 'employee';

    const handleLogout = () => {
        // Clear token or session
        useAuthStore.getState().logout();

        // Clear persistent state
        useProductCustomizationStore.getState().reset();
        useGenerateRoomStore.getState().reset();
        useCartStore.getState().reset();


        logout();
        router.replace('/login');
    };

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}users/me`, {
                headers: {
                    Authorization: `Bearer ${useAuthStore.getState().token}`,
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            
            const data = await response.json();
            setUserData(data);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.buttonBackground} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <TopBar />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <Button onPress={fetchUserData}>Retry</Button>
                </View>
            </View>
        );
    }

    // Check if user is admin
    const isAdmin = userData?.role === 'admin';

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SafeAreaView style={styles.safeAreaView}>
                    <TopBar />
                    
                    <View style={styles.contentContainer}>
                        <View style={styles.headerContainer}>
                            <MaterialIcons 
                                name="account-circle" 
                                size={80} 
                                color={Colors.buttonBackground}
                            />
                            <Text style={styles.welcomeText}>
                                Welcome, {userData?.firstName} {userData?.lastName}!
                            </Text>
                            <Text style={styles.emailText}>{userData?.email}</Text>
                        </View>
                        
                        <View style={styles.infoContainer}>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Account Type:</Text>
                                <Text style={styles.infoValue}>
                                    {isAdmin ? 'Administrator' : 
                                     userData?.role === 'employee' ? 'Employee' : 'Customer'}
                                </Text>
                            </View>
                            
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Member Since:</Text>
                                <Text style={styles.infoValue}>
                                    {new Date(userData?.createdAt).toLocaleDateString()}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.sectionTitle}>My Orders</Text>
                            <Link href="/account/orders" asChild>
                                <Pressable style={styles.settingsItem}>
                                <MaterialIcons name="list-alt" size={24} color={Colors.buttonBackground} />
                                <Text style={styles.settingsText}>View My Orders</Text>
                                <MaterialIcons 
                                    name="chevron-right" 
                                    size={24} 
                                    color={Colors.primaryText}
                                    style={{ marginLeft: 'auto' }}
                                />
                                </Pressable>
                            </Link>
                        </View>
                        {isAdminOrEmployee && (
                            <>
                                <Text style={styles.sectionTitle}>Admin Tools</Text>
                                <Link href="/(app)/admin/order" asChild>
                                    <Pressable style={styles.settingsItem}>
                                        <MaterialIcons name="assignment" size={24} color={Colors.buttonBackground} />
                                        <Text style={styles.settingsText}>Manage All Orders</Text>
                                        <MaterialIcons 
                                            name="chevron-right" 
                                            size={24} 
                                            color={Colors.primaryText}
                                            style={{ marginLeft: 'auto' }}
                                        />
                                    </Pressable>
                                </Link>
                            </>
                        )}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Account Settings</Text>
                            <View style={styles.settingsItem}>
                                <MaterialIcons name="edit" size={24} color={Colors.buttonBackground} />
                                <Text style={styles.settingsText}>Edit Profile</Text>
                            </View>
                            
                            {/* Admin-specific features */}
                            {isAdmin && (
                                <>
                                    <View style={styles.settingsItem}>
                                        <MaterialIcons name="edit-attributes" size={24} color={Colors.buttonBackground} />
                                        <Text style={styles.settingsText}>Edit Employee</Text>
                                    </View>
                                    <View style={styles.settingsItem}>
                                        <MaterialIcons name="person-add" size={24} color={Colors.buttonBackground} />
                                        <Text style={styles.settingsText}>Add Employee</Text>
                                    </View>
                                </>
                            )}
                        </View>
                        
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Support</Text>
                            <View style={styles.settingsItem}>
                                <MaterialIcons name="help" size={24} color={Colors.buttonBackground} />
                                <Text style={styles.settingsText}>Help Center</Text>
                            </View>
                            <View style={styles.settingsItem}>
                                <MaterialIcons name="contact-support" size={24} color={Colors.buttonBackground} />
                                <Text style={styles.settingsText}>Contact Us</Text>
                            </View>
                        </View>
                        <View style={styles.section}>
                        
                        <Button 
                            onPress={handleLogout} 
                            style={styles.logoutButton}
                            textStyle={styles.logoutButtonText}
                        >
                            Log Out
                        </Button>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.primaryBackground,
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primaryBackground,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      color: Colors.error,
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
    },
    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      paddingVertical: 20,
    },
    safeAreaView: {
      width: '100%',
      maxWidth: 500,
      paddingHorizontal: 15,
      alignSelf: 'center',
    },
    contentContainer: {
      width: '100%',
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.primaryText,
      marginTop: 10,
      textAlign: 'center',
    },
    emailText: {
      fontSize: 16,
      color: Colors.placeHolderText,
      marginTop: 5,
    },
    infoContainer: {
      backgroundColor: Colors.inputBackground,
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
      width: '100%',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
    },
    infoLabel: {
      fontSize: 16,
      color: Colors.primaryText,
      fontWeight: '600',
    },
    infoValue: {
      fontSize: 16,
      color: Colors.buttonBackground,
      fontWeight: '500',
    },
    section: {
      marginBottom: 25,
      width: '100%',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.buttonBackground,
      marginBottom: 15,
      paddingLeft: 5,
    },
    settingsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
      width: '100%',
    },
    settingsText: {
      fontSize: 16,
      color: Colors.primaryText,
      marginLeft: 15,
      flex: 1,
    },
    logoutButton: {
      backgroundColor: Colors.buttonText,
      borderWidth: 2,
      borderColor: Colors.buttonBackground,
      marginTop: 20,
    },
    logoutButtonText: {
      color: Colors.buttonBackground,
      fontWeight: 'bold',
    },
  });
  