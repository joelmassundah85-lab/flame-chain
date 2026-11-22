
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

  useEffect(() => {
    if (!isMining) return;

    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
      setBalance((previous) => previous + 0.000001);
    }, 1000);

    return () => clearInterval(timer);
  }, [isMining]);

  const formatTime = () => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return (
      String(hours).padStart(2, '0') +
      ':' +
      String(minutes).padStart(2, '0') +
      ':' +
      String(secs).padStart(2, '0')
    );
  };

  const renderHome = () => (
    <>
      <View style={styles.hero}>
        <Text style={styles.flameIcon}>🔥</Text>
        <Text style={styles.logo}>FLAME CHAIN</Text>
        <Text style={styles.tagline}>
          Ignite your digital future
        </Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.smallLabel}>TOTAL BALANCE</Text>
        <Text style={styles.balance}>
          {balance.toFixed(6)}
        </Text>
        <Text style={styles.coin}>FLAME</Text>

        <View style={styles.divider} />

        <Text style={styles.miningStatus}>
          {isMining ? '🔥 Mining is active' : 'Ready to ignite'}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Mining rate</Text>
          <Text style={styles.statValue}>0.000001</Text>
          <Text style={styles.statUnit}>FLAME / second</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Mining time</Text>
          <Text style={styles.statValue}>{formatTime()}</Text>
          <Text style={styles.statUnit}>Session duration</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => setActiveTab('Mining')}
      >
        <Text style={styles.mainButtonText}>
          🔥  START MINING
        </Text>
      </TouchableOpacity>

      <Text style={styles.description}>
        Join the FLAME CHAIN community and begin
        your digital journey.
      </Text>
    </>
  );

  const renderMining = () => (
    <>
      <Text style={styles.sectionTitle}>🔥 Mining Center</Text>
      <Text style={styles.sectionSubtitle}>
        Ignite your mining session
      </Text>

      <View style={styles.miningCard}>
        <Text style={styles.flameIcon}>🔥</Text>

        <Text style={styles.miningState}>
          {isMining ? 'MINING ACTIVE' : 'MINING INACTIVE'}
        </Text>

        <Text style={styles.balance}>
          {balance.toFixed(6)}
        </Text>

        <Text style={styles.coin}>FLAME</Text>

        <View style={styles.divider} />

        <Text style={styles.miningStatus}>
          {formatTime()}
        </Text>

        <Text style={styles.description}>
          {isMining
            ? 'Your prototype mining session is running.'
            : 'Start a session to see your balance increase.'}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.mainButton,
          isMining && styles.stopButton,
        ]}
        onPress={() => setIsMining(!isMining)}
      >
        <Text style={styles.mainButtonText}>
          {isMining ? 'STOP MINING' : '🔥  START MINING'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.description}>
        This is a simulated mining feature.
        It does not generate real cryptocurrency.
      </Text>
    </>
  );

  const renderWallet = () => (
    <>
      <Text style={styles.sectionTitle}>My Wallet</Text>
      <Text style={styles.sectionSubtitle}>
        Your FLAME CHAIN assets
      </Text>

      <View style={styles.balanceCard}>
        <Text style={styles.smallLabel}>TOTAL BALANCE</Text>
        <Text style={styles.balance}>
          {balance.toFixed(6)}
        </Text>
        <Text style={styles.coin}>FLAME</Text>
      </View>

      <View style={styles.walletCard}>
        <Text style={styles.statLabel}>Available balance</Text>
        <Text style={styles.walletValue}>
          {balance.toFixed(6)} FLAME
        </Text>
      </View>

      <View style={styles.walletCard}>
        <Text style={styles.statLabel}>Mining rewards</Text>
        <Text style={styles.walletValue}>
          {balance.toFixed(6)} FLAME
        </Text>
      </View>

      <Text style={styles.description}>
        Wallet transactions and real transfers
        will be added in a future version.
      </Text>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#160604"
      />

      <View style={styles.background}>
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <Text style={styles.topLogo}>🔥 FLAME</Text>
            <View style={styles.networkBadge}>
              <View style={styles.onlineDot} />
              <Text style={styles.networkText}>TESTNET</Text>
            </View>
          </View>

          {activeTab === 'Home' && renderHome()}
          {activeTab === 'Wallet' && renderWallet()}
          {activeTab === 'Mining' && renderMining()}
        </ScrollView>

        <View style={styles.bottomNav}>
          {(['Home', 'Wallet', 'Mining'] as Tab[]).map(
            (tab) => (
              <TouchableOpacity
                key={tab}
                style={styles.navItem}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.navIcon,
                    activeTab === tab && styles.activeNavText,
                  ]}
                >
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
    backgroundColor: '#160604',
  },

  background: {
    flex: 1,
    backgroundColor: '#160604',
    overflow: 'hidden',
  },

  glowTop: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#7B1D0B',
    opacity: 0.45,
  },

  glowBottom: {
    position: 'absolute',
    bottom: 40,
    right: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#A32C08',
    opacity: 0.25,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

  topLogo: {
    color: '#FF8A32',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },

  networkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#302018',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#66351D',
  },

  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FF8A32',
    marginRight: 7,
  },

  networkText: {
    color: '#FFB477',
    fontSize: 10,
    fontWeight: '700',
  },

  hero: {
    alignItems: 'center',
    marginBottom: 30,
  },

  flameIcon: {
    fontSize: 58,
    marginBottom: 8,
  },

  logo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FF8735',
    letterSpacing: 2,
  },

  tagline: {
    color: '#C98B6C',
    fontSize: 13,
    marginTop: 8,
  },

  balanceCard: {
    backgroundColor: '#35170F',
    borderRadius: 24,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8D3B1A',
    marginBottom: 16,
  },

  smallLabel: {
    color: '#D6A080',
    fontSize: 12,
    letterSpacing: 2,
  },

  balance: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 14,
  },

  coin: {
    color: '#FF9748',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 5,
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#70402D',
    marginVertical: 20,
  },

  miningStatus: {
    color: '#FFB477',
    fontSize: 14,
    fontWeight: '600',
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 22,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#28130E',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#542819',
  },

  statLabel: {
    color: '#C49A83',
    fontSize: 12,
  },

  statValue: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 10,
  },

  statUnit: {
    color: '#B27C5E',
    fontSize: 10,
    marginTop: 5,
  },

  mainButton: {
    backgroundColor: '#FF6B1A',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#FF5A00',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },

  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },

  stopButton: {
    backgroundColor: '#8B2920',
  },

  description: {
    color: '#B9917A',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 20,
  },

  sectionTitle: {
    color: '#FF8A32',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 10,
  },

  sectionSubtitle: {
    color: '#B9917A',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 25,
  },

  miningCard: {
    backgroundColor: '#35170F',
    borderRadius: 24,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8D3B1A',
  },

  miningState: {
    color: '#FFB477',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },

  walletCard: {
    backgroundColor: '#28130E',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#542819',
    marginBottom: 14,
  },

  walletValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 12,
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#21100B',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#542819',
  },

  navItem: {
    alignItems: 'center',
    minWidth: 70,
  },

  navIcon: {
    color: '#A17B66',
    fontSize: 22,
    marginBottom: 4,
  },

  navText: {
    color: '#A17B66',
    fontSize: 11,
    fontWeight: '600',
  },

  activeNavText: {
    color: '#FF8735',
  },
});
