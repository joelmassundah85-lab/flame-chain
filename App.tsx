import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';

type Tab = 'Home' | 'Wallet' | 'Mining';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [isMining, setIsMining] = useState(false);
  const [balance, setBalance] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [walletAddress] = useState(
    '0x7A3F...92B1'
  );

  useEffect(() => {
    if (!isMining) return;

    const timer = setInterval(() => {
      setSeconds(previous => previous + 1);
      setBalance(previous => previous + 0.000001);
    }, 1000);

    return () => clearInterval(timer);
  }, [isMining]);

  const formatTime = () => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      String(hours).padStart(2, '0'),
      String(minutes).padStart(2, '0'),
      String(secs).padStart(2, '0'),
    ].join(':');
  };

  const formatBalance = (amount: number) => {
    return amount.toFixed(6);
  };

  const renderHome = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.greeting}>
        Welcome to
      </Text>

      <Text style={styles.logo}>
        FLAME CHAIN
      </Text>

      <Text style={styles.subtitle}>
        Mine. Earn. Connect.
      </Text>

      <View style={styles.balanceCard}>
        <Text style={styles.cardLabel}>
          TOTAL BALANCE
        </Text>

        <Text style={styles.balance}>
          {formatBalance(balance)}
        </Text>

        <Text style={styles.coin}>
          FLAME
        </Text>

        <View style={styles.divider} />

        <View style={styles.statsRow}>
          <View>
            <Text style={styles.smallLabel}>
              Mining status
            </Text>

            <Text style={styles.status}>
              {isMining ? '● Mining' : '● Inactive'}
            </Text>
          </View>

          <View>
            <Text style={styles.smallLabel}>
              Mining time
            </Text>

            <Text style={styles.statValue}>
              {formatTime()}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.mainButton,
          isMining && styles.stopButton,
        ]}
        onPress={() => setIsMining(!isMining)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {isMining ? 'STOP MINING' : 'START MINING'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>
        Your dashboard
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoIcon}>🔥</Text>

        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>
            Mining rewards
          </Text>

          <Text style={styles.infoDescription}>
            Earn demo FLAME rewards while mining.
          </Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoIcon}>🔐</Text>

        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>
            Secure wallet
          </Text>

          <Text style={styles.infoDescription}>
            View your demo wallet balance and address.
          </Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoIcon}>🌍</Text>

        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>
            Global community
          </Text>

          <Text style={styles.infoDescription}>
            FLAME CHAIN is designed for a global community.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderWallet = () => (
    <ScrollView
      contentContainerStyle={styles.content}
    >
      <Text style={styles.screenTitle}>
        My Wallet
      </Text>

      <Text style={styles.subtitle}>
        Manage your FLAME balance
      </Text>

      <View style={styles.balanceCard}>
        <Text style={styles.cardLabel}>
          AVAILABLE BALANCE
        </Text>

        <Text style={styles.balance}>
          {formatBalance(balance)}
        </Text>

        <Text style={styles.coin}>
          FLAME
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Wallet address
      </Text>

      <View style={styles.addressCard}>
        <Text style={styles.address}>
          {walletAddress}
        </Text>

        <Text style={styles.demoNotice}>
          Demo address only
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Wallet activity
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoIcon}>⛏️</Text>

        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>
            Mining rewards
          </Text>

          <Text style={styles.infoDescription}>
            {formatBalance(balance)} FLAME earned
          </Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoIcon}>💸</Text>

        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>
            Transfers
          </Text>

          <Text style={styles.infoDescription}>
            Real transfers are not enabled yet.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderMining = () => (
    <ScrollView
      contentContainerStyle={styles.content}
    >
      <Text style={styles.screenTitle}>
        FLAME Mining
      </Text>

      <Text style={styles.subtitle}>
        Start mining and earn demo rewards.
      </Text>

      <View style={styles.miningCard}>
        <Text style={styles.fireIcon}>
          🔥
        </Text>

        <Text style={styles.miningStatus}>
          {isMining ? 'MINING ACTIVE' : 'MINING INACTIVE'}
        </Text>

        <Text style={styles.miningTimer}>
          {formatTime()}
        </Text>

        <Text style={styles.smallLabel}>
          Total mining time
        </Text>

        <View style={styles.divider} />

        <Text style={styles.cardLabel}>
          TOTAL REWARDS
        </Text>

        <Text style={styles.balance}>
          {formatBalance(balance)}
        </Text>

        <Text style={styles.coin}>
          FLAME
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.mainButton,
          isMining && styles.stopButton,
        ]}
        onPress={() => setIsMining(!isMining)}
      >
        <Text style={styles.buttonText}>
          {isMining ? 'STOP MINING' : 'START MINING'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.demoNotice}>
        Mining runs only while this app is open.
        Rewards are simulated and have no monetary value.
      </Text>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#100805"
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerLogo}>
              🔥 FLAME CHAIN
            </Text>

            <Text style={styles.headerSubtitle}>
              The future starts here
            </Text>
          </View>

          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>
              {isMining ? 'MINING' : 'READY'}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          {activeTab === 'Home' && renderHome()}
          {activeTab === 'Wallet' && renderWallet()}
          {activeTab === 'Mining' && renderMining()}
        </View>

        <View style={styles.bottomNav}>
          {(['Home', 'Wallet', 'Mining'] as Tab[]).map(
            tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.navItem,
                  activeTab === tab && styles.activeNav,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={styles.navIcon}>
                  {tab === 'Home'
                    ? '⌂'
                    : tab === 'Wallet'
                    ? '▣'
                    : '🔥'}
                </Text>

                <Text
                  style={[
                    styles.navText,
                    activeTab === tab && styles.activeNavText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#100805',
  },

  container: {
    flex: 1,
    backgroundColor: '#100805',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#392017',
  },

  headerLogo: {
    color: '#FF6A00',
    fontSize: 20,
    fontWeight: 'bold',
  },

  headerSubtitle: {
    color: '#A88B7C',
    fontSize: 12,
    marginTop: 4,
  },

  liveBadge: {
    backgroundColor: '#301507',
    borderColor: '#FF6A00',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  liveText: {
    color: '#FF8C32',
    fontSize: 11,
    fontWeight: 'bold',
  },

  body: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  greeting: {
    color: '#E0B7A1',
    fontSize: 16,
  },

  logo: {
    color: '#FF6A00',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
  },

  subtitle: {
    color: '#A88B7C',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 22,
  },

  screenTitle: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
  },

  balanceCard: {
    backgroundColor: '#261209',
    borderColor: '#66300F',
    borderWidth: 1,
    borderRadius: 22,
    padding: 22,
    marginTop: 22,
  },

  cardLabel: {
    color: '#B99A88',
    fontSize: 12,
    letterSpacing: 1.5,
  },

  balance: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 10,
  },

  coin: {
    color: '#FF7A1A',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: '#59301E',
    marginVertical: 20,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  smallLabel: {
    color: '#A88B7C',
    fontSize: 12,
  },

  status: {
    color: '#FF8C32',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
  },

  statValue: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
  },

  mainButton: {
    backgroundColor: '#FF6A00',
    padding: 17,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },

  stopButton: {
    backgroundColor: '#5C2410',
    borderWidth: 1,
    borderColor: '#FF6A00',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 14,
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C100B',
    borderColor: '#392017',
    borderWidth: 1,
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
  },

  infoIcon: {
    fontSize: 25,
    marginRight: 14,
  },

  infoText: {
    flex: 1,
  },

  infoTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  infoDescription: {
    color: '#A88B7C',
    fontSize: 12,
    marginTop: 5,
  },

  addressCard: {
    backgroundColor: '#1C100B',
    borderColor: '#392017',
    borderWidth: 1,
    borderRadius: 15,
    padding: 18,
  },

  address: {
    color: '#FF8C32',
    fontSize: 18,
    fontWeight: 'bold',
  },

  demoNotice: {
    color: '#A88B7C',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 18,
  },

  miningCard: {
    backgroundColor: '#261209',
    borderColor: '#66300F',
    borderWidth: 1,
    borderRadius: 22,
    padding: 25,
    alignItems: 'center',
    marginTop: 10,
  },

  fireIcon: {
    fontSize: 65,
    marginBottom: 15,
  },

  miningStatus: {
    color: '#FF8C32',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  miningTimer: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },

  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#160B06',
    borderTopWidth: 1,
    borderTopColor: '#392017',
    paddingTop: 10,
    paddingBottom: 12,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 12,
  },

  activeNav: {
    backgroundColor: '#3A1A0A',
  },

  navIcon: {
    color: '#A88B7C',
    fontSize: 25,
  },

  navText: {
    color: '#A88B7C',
    fontSize: 12,
    marginTop: 4,
  },

  activeNavText: {
    color: '#FF8C32',
    fontWeight: 'bold',
  },
});
