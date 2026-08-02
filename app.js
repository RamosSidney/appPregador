/* ==========================================================================
   appPregador V2.0 - Core Application Logic
   ========================================================================== */

// --- Global Application State ---
let supabaseClient = null;
let userProfile = null;
let savedSermons = [];
let selectedPainVibes = [];
let selectedPopVibes = [];
let currentActiveSermon = null;
let authUserEmail = '';

// Teleprompter / Pulpit state
let activeFontSize = 32; // Default starting font size (px)
let currentSpeed = 0;    // 0 = Off, 1 = Slow, 2 = Normal, 3 = Fast
let scrollIntervalId = null;
let lastScrollTime = 0;
let secondsRemaining = 900; // 15 minutes default
let pulpitConfiguredTimeSeconds = 900; // 15 minutes default configured target
let timerInterval = null;
let isTimerRunning = false;
// Simulated State (Local fallback)
let simulatedCredits = 100;
let simulatedSermons = [];

// --- Gamification & Extra Módulos State (Manifesto 2.0) ---
let leaderXp = 0;
let leaderLevel = 1;
let completedLessons = [1]; // Lesson 1.1 concluída por padrão

let selectedMentorId = null;
let mentoriaConversations = {
    lewis: [],
    spurgeon: [],
    bonhoeffer: []
};

let selectedBibleVerseId = null;
let selectedBibleText = "";
let selectedBibleRef = "";

let bibleHighlights = {};
try {
    const saved = localStorage.getItem('app_pregador_bible_highlights');
    if (saved) bibleHighlights = JSON.parse(saved);
} catch (e) {
    bibleHighlights = {};
}

let bibleChatSession = {
    actionType: '', // 'quebra-gelo' or 'traducao'
    verseRef: '',
    verseText: '',
    messages: [] // [{role: 'user'|'assistant', content: string}]
};

// --- Recharge State ---
let selectedRechargePackage = 'premium_anual';
let selectedPaymentMethod = 'pix';

// --- Onboarding State ---
let onboardSelectedFocus = "";
let onboardTermsAccepted = false;
// --- Credential Config Storage ---
let config = {
    supabaseUrl: '',
    supabaseKey: '',
    groqKey: ''
};

// --- DOM elements cache ---
let elements = {};

function initDOMElements() {
    elements = {
        // App Views
        tabGenerateBtn: document.getElementById('tabGenerateBtn'),
        tabLibraryBtn: document.getElementById('tabLibraryBtn'),
        tabMentoriaBtn: document.getElementById('tabMentoriaBtn'),
        tabBibliaBtn: document.getElementById('tabBibliaBtn'),
        tabAcademiaBtn: document.getElementById('tabAcademiaBtn'),
        tabRecargaBtn: document.getElementById('tabRecargaBtn'),
        paneGenerate: document.getElementById('paneGenerate'),
        paneLibrary: document.getElementById('paneLibrary'),
        paneMentoria: document.getElementById('paneMentoria'),
        paneBiblia: document.getElementById('paneBiblia'),
        paneAcademia: document.getElementById('paneAcademia'),
        paneRecarga: document.getElementById('paneRecarga'),
        statusDot: document.getElementById('statusDot'),
        statusLabel: document.getElementById('statusLabel'),
        
        // Settings Modal
        openSettingsBtn: document.getElementById('openSettingsBtn'),
        closeSettingsBtn: document.getElementById('closeSettingsBtn'),
        settingsModal: document.getElementById('settingsModal'),
        saveSettingsBtn: document.getElementById('saveSettingsBtn'),
        clearSettingsBtn: document.getElementById('clearSettingsBtn'),
        setGroqKey: document.getElementById('setGroqKey'),
        setSupabaseUrl: document.getElementById('setSupabaseUrl'),
        setSupabaseKey: document.getElementById('setSupabaseKey'),
        settingsConnectionStatus: document.getElementById('settingsConnectionStatus'),
        tabSettingsApiBtn: document.getElementById('tabSettingsApiBtn'),
        tabSettingsAuthBtn: document.getElementById('tabSettingsAuthBtn'),
        paneSettingsApi: document.getElementById('paneSettingsApi'),
        paneSettingsAuth: document.getElementById('paneSettingsAuth'),

        // Fullscreen Login Screen
        authScreen: document.getElementById('authScreen'),
        appHeader: document.getElementById('appHeader'),
        appContainer: document.getElementById('appContainer'),
        btnSwitchLogin: document.getElementById('btnSwitchLogin'),
        btnSwitchRegister: document.getElementById('btnSwitchRegister'),
        formLogin: document.getElementById('formLogin'),
        formRegister: document.getElementById('formRegister'),
        btnGuestBypass: document.getElementById('btnGuestBypass'),
        loginEmail: document.getElementById('loginEmail'),
        loginPassword: document.getElementById('loginPassword'),
        registerName: document.getElementById('registerName'),
        registerUsername: document.getElementById('registerUsername'),
        registerEmail: document.getElementById('registerEmail'),
        registerPassword: document.getElementById('registerPassword'),
        btnSubmitLogin: document.getElementById('btnSubmitLogin'),
        btnSubmitRegister: document.getElementById('btnSubmitRegister'),
        btnSettingsOpenAuth: document.getElementById('btnSettingsOpenAuth'),

        // Settings Account State
        authSettingsLoggedOutState: document.getElementById('authSettingsLoggedOutState'),
        authLoggedInState: document.getElementById('authLoggedInState'),
        userProfileAvatar: document.getElementById('userProfileAvatar'),
        userProfileName: document.getElementById('userProfileName'),
        userProfileUsername: document.getElementById('userProfileUsername'),
        userProfileCredits: document.getElementById('userProfileCredits'),
        submitLogoutBtn: document.getElementById('submitLogoutBtn'),

        // Energy Bar UI
        creditsCount: document.getElementById('creditsCount'),
        energyBar: document.getElementById('energyBar'),
        sparklesContainer: document.getElementById('sparklesContainer'),
        
        // Gamified XP UI
        userLevelVal: document.getElementById('userLevelVal'),
        userXpVal: document.getElementById('userXpVal'),
        xpProgressBar: document.getElementById('xpProgressBar'),
        
        // Generator Panel
        painChips: document.querySelectorAll('#painChips .chip'),
        popChips: document.querySelectorAll('#popChips .chip'),
        customReference: document.getElementById('customReference'),
        sermonTopic: document.getElementById('sermonTopic'),
        generateSermonBtn: document.getElementById('generateSermonBtn'),
        
        // AI Response Output
        sermonOutputWrapper: document.getElementById('sermonOutputWrapper'),
        sermonBody: document.getElementById('sermonBody'),
        sermonReadTitle: document.getElementById('sermonReadTitle'),
        saveSermonBtn: document.getElementById('saveSermonBtn'),
        pulpitModeBtn: document.getElementById('pulpitModeBtn'),
        copyReelsBtn: document.getElementById('copyReelsBtn'),
        copyFullSermonBtn: document.getElementById('copyFullSermonBtn'),
        backToGeneratorBtn: document.getElementById('backToGeneratorBtn'),
        insightVibeVal: document.getElementById('insightVibeVal'),
        insightPopVal: document.getElementById('insightPopVal'),
        insightDateVal: document.getElementById('insightDateVal'),
        reelsCodeContent: document.getElementById('reelsCodeContent'),
        
        // Saved Library
        librarySearchInput: document.getElementById('librarySearchInput'),
        filterTabs: document.querySelectorAll('.filter-tab'),
        libraryGrid: document.getElementById('libraryGrid'),
        emptyStateGenerateBtn: document.getElementById('emptyStateGenerateBtn'),
        
        // Mentorship Chat DOM Elements
        mentoriaHub: document.getElementById('mentoriaHub'),
        mentoriaChat: document.getElementById('mentoriaChat'),
        backToMentorsBtn: document.getElementById('backToMentorsBtn'),
        activeMentorAvatar: document.getElementById('activeMentorAvatar'),
        activeMentorName: document.getElementById('activeMentorName'),
        activeMentorAlcunha: document.getElementById('activeMentorAlcunha'),
        mentoriaChatScroll: document.getElementById('mentoriaChatScroll'),
        mentoriaEmptyState: document.getElementById('mentoriaEmptyState'),
        mentoriaConversationLog: document.getElementById('mentoriaConversationLog'),
        mentorLoading: document.getElementById('mentorLoading'),
        mentoriaForm: document.getElementById('mentoriaForm'),
        mentoriaInput: document.getElementById('mentoriaInput'),

        // Bible DOM Elements
        bibleBookSelect: document.getElementById('bibleBookSelect'),
        bibleChapterSelect: document.getElementById('bibleChapterSelect'),
        bibleChapterTitle: document.getElementById('bibleChapterTitle'),
        bibleVersesList: document.getElementById('bibleVersesList'),
        bibleFloatingMenu: document.getElementById('bibleFloatingMenu'),
        btnGenIcebreaker: document.getElementById('btnGenIcebreaker'),
        btnTranslateGenZ: document.getElementById('btnTranslateGenZ'),
        btnBibleCopy: document.getElementById('btnBibleCopy'),
        btnBibleShare: document.getElementById('btnBibleShare'),
        bibleActionModal: document.getElementById('bibleActionModal'),
        bibleModalTitle: document.getElementById('bibleModalTitle'),
        bibleModalVerseRef: document.getElementById('bibleModalVerseRef'),
        bibleChatHistory: document.getElementById('bibleChatHistory'),
        bibleChatInput: document.getElementById('bibleChatInput'),
        btnBibleSendChat: document.getElementById('btnBibleSendChat'),
        closeBibleModalBtn: document.getElementById('closeBibleModalBtn'),

        // Academy RPG DOM Elements
        academyLevelVal: document.getElementById('academyLevelVal'),
        academyXpVal: document.getElementById('academyXpVal'),
        academyXpBar: document.getElementById('academyXpBar'),
        lessonReaderModal: document.getElementById('lessonReaderModal'),
        lessonModalTitle: document.getElementById('lessonModalTitle'),
        lessonModalContent: document.getElementById('lessonModalContent'),
        closeLessonModalBtn: document.getElementById('closeLessonModalBtn'),
        closeLessonModalFooterBtn: document.getElementById('closeLessonModalFooterBtn'),
        completeLessonBtn: document.getElementById('completeLessonBtn'),
        
        // Pulpit Teleprompter Screen
        pulpitOverlay: document.getElementById('pulpitOverlay'),
        pulpitCloseBtn: document.getElementById('pulpitCloseBtn'),
        fontSizeDecBtn: document.getElementById('fontSizeDecBtn'),
        fontSizeIncBtn: document.getElementById('fontSizeIncBtn'),
        fontSizeVal: document.getElementById('fontSizeVal'),
        pulpitTimer: document.getElementById('pulpitTimer'),
        pulpitTimerPlayBtn: document.getElementById('pulpitTimerPlayBtn'),
        pulpitTimerResetBtn: document.getElementById('pulpitTimerResetBtn'),
        pulpitContent: document.getElementById('pulpitContent'),
        pulpitScrollContainer: document.getElementById('pulpitScrollContainer'),
        speedBtns: document.querySelectorAll('.speed-btn'),
        
        // Notify Container
        toastContainer: document.getElementById('toastContainer'),
        
        // Recharge DOM Elements
        rechargeBalanceCount: document.getElementById('rechargeBalanceCount'),
        btnPayPix: document.getElementById('btnPayPix'),
        btnPayCard: document.getElementById('btnPayCard'),
        btnSubmitRecharge: document.getElementById('btnSubmitRecharge'),
        submitQtyVal: document.getElementById('submitQtyVal'),
        
        // Onboarding DOM Elements
        onboardingOverlay: document.getElementById('onboardingOverlay'),
        onboardStep1: document.getElementById('onboardStep1'),
        onboardStep2: document.getElementById('onboardStep2'),
        onboardStep1Bar: document.getElementById('onboardStep1Bar'),
        onboardStep2Bar: document.getElementById('onboardStep2Bar'),
        onboardStepIndicator: document.getElementById('onboardStepIndicator'),
        btnOnboardNext: document.getElementById('btnOnboardNext'),
        btnOnboardSubmit: document.getElementById('btnOnboardSubmit'),
        chkLgpdConsent: document.getElementById('chkLgpdConsent'),
        
        // Admin Panel DOM Elements
        tabAdminBtn: document.getElementById('tabAdminBtn'),
        paneAdmin: document.getElementById('paneAdmin'),
        adminUserSearchInput: document.getElementById('adminUserSearchInput'),
        btnAdminSearch: document.getElementById('btnAdminSearch'),
        adminSupportQueue: document.getElementById('adminSupportQueue'),
        adminQueueEmptyState: document.getElementById('adminQueueEmptyState'),
        
        // Collapsible Sidebar & Dedicated Sermon visualizer
        appSidebar: document.getElementById('appSidebar'),
        btnCollapseSidebar: document.getElementById('btnCollapseSidebar'),
        paneSermonReader: document.getElementById('paneSermonReader'),
        backToGeneratorBtn: document.getElementById('backToGeneratorBtn')
    };
}

// --- App Initialization ---
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    initDOMElements();
    loadConfig();
    setupEventListeners();
    initConnection();
    updateCreditsUI();
    renderLibrary();
}

// --- Config Management ---
function loadConfig() {
    const savedConfig = localStorage.getItem('app_pregador_config');
    if (savedConfig) {
        try {
            config = JSON.parse(savedConfig);
        } catch (e) {
            console.error("Erro ao carregar configurações", e);
        }
    }
    
    // Fallback para credenciais de produção padrão
    if (!config.supabaseUrl) {
        config.supabaseUrl = 'https://ugdwufgqynflywqmfmus.supabase.co';
    }
    if (!config.supabaseKey) {
        config.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZHd1ZmdxeW5mbHl3cW1mbXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NDYzMTcsImV4cCI6MjA5OTMyMjMxN30.QordsszgiDzPLWDc1GK71uO9qakXU7Hi05MtqQIKFFg';
    }
    
    if (elements.setGroqKey) elements.setGroqKey.value = config.groqKey || '';
    if (elements.setSupabaseUrl) elements.setSupabaseUrl.value = config.supabaseUrl || '';
    if (elements.setSupabaseKey) elements.setSupabaseKey.value = config.supabaseKey || '';
    
    // Load local storage mock databases
    const savedMockSermons = localStorage.getItem('app_pregador_mock_sermons');
    if (savedMockSermons) {
        try {
            simulatedSermons = JSON.parse(savedMockSermons);
        } catch (e) {
            simulatedSermons = [];
        }
    }
    
    const savedMockCredits = localStorage.getItem('app_pregador_mock_credits');
    if (savedMockCredits !== null) {
        simulatedCredits = parseInt(savedMockCredits, 10);
    }
}

function saveConfig() {
    config.groqKey = elements.setGroqKey.value.trim();
    config.supabaseUrl = elements.setSupabaseUrl.value.trim();
    config.supabaseKey = elements.setSupabaseKey.value.trim();
    
    localStorage.setItem('app_pregador_config', JSON.stringify(config));
    showToast("Configurações salvas localmente!", "success");
    
    initConnection();
    closeSettingsModal();
}

function resetConfig() {
    elements.setGroqKey.value = '';
    elements.setSupabaseUrl.value = '';
    elements.setSupabaseKey.value = '';
    config = { supabaseUrl: '', supabaseKey: '', groqKey: '' };
    localStorage.removeItem('app_pregador_config');
    
    showToast("Configurações limpas!", "success");
    initConnection();
}

// --- Supabase Connection Manager ---
async function initConnection() {
    if (config.supabaseUrl && config.supabaseKey) {
        try {
            // Check if client is initialized
            supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseKey);
            
            // Try fetching authentication info to see if credentials work
            const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
            
            if (sessionError) throw sessionError;
            
            // Activate authentication tab
            elements.tabSettingsAuthBtn.disabled = false;
            
            // Connection visual updates
            elements.statusDot.className = "status-dot connected";
            elements.statusLabel.textContent = "Conectado Supabase";
            
            // Connection dialog badge updates
            const statusBullet = elements.settingsConnectionStatus.querySelector('.status-bullet');
            const statusText = elements.settingsConnectionStatus.querySelector('.status-text');
            statusBullet.className = "status-bullet connected";
            statusText.textContent = "Conectado ao Banco Supabase";

            if (session) {
                await loadUserProfile(session.user.id);
                hideAuthScreen();
            } else {
                userProfile = null;
                showLoggedOutUI();
                showAuthScreen();
            }
        } catch (err) {
            console.error("Erro de conexão com o Supabase:", err);
            showToast("Falha de conexão com o Supabase. Modo Simulação ativo.", "error");
            activateSimulationMode();
            showAuthScreen();
        }
    } else {
        activateSimulationMode();
        showAuthScreen();
    }
    
    // Sync library after state change
    await syncSermons();
    updateSettingsTabsVisibility();
}

function updateSettingsTabsVisibility() {
    let isSuperAdmin = false;
    if (userProfile) {
        const email = authUserEmail || '';
        isSuperAdmin = (email && email.toLowerCase() === 'admin@pregador.com') || 
                       (userProfile.username && userProfile.username.toLowerCase() === 'admin') || 
                       (userProfile.username && userProfile.username.toLowerCase() === 'superadmin') || 
                       userProfile.tipo_plano === 'SUPER_ADMIN';
    }
    
    // Mostra a aba de conexões API se ainda não estiver conectado ao Supabase (fase inicial de setup) OU se for Super Admin
    if (!supabaseClient || isSuperAdmin) {
        if (elements.tabSettingsApiBtn) elements.tabSettingsApiBtn.classList.remove('hidden');
    } else {
        if (elements.tabSettingsApiBtn) {
            elements.tabSettingsApiBtn.classList.add('hidden');
            // Se a aba ativa for a API, muda para a aba de autenticação de conta
            if (elements.tabSettingsApiBtn.classList.contains('active')) {
                switchSettingsModalTab('auth');
            }
        }
    }
}

function activateSimulationMode() {
    supabaseClient = null;
    userProfile = null;
    elements.tabSettingsAuthBtn.disabled = true;
    
    elements.statusDot.className = "status-dot simulated";
    elements.statusLabel.textContent = "Modo Simulação";
    
    const statusBullet = elements.settingsConnectionStatus.querySelector('.status-bullet');
    const statusText = elements.settingsConnectionStatus.querySelector('.status-text');
    statusBullet.className = "status-bullet simulated";
    statusText.textContent = "Usando Banco Local Simulado";
    
    showLoggedOutUI();
    updateCreditsUI();
}

// --- Auth flows ---
async function loadUserProfile(userId) {
    try {
        const { data, error } = await supabaseClient
            .from('perfis_jovens')
            .select('*')
            .eq('id', userId)
            .single();
            
        if (error) {
            // Profile may not exist yet, let's create a temporary one or fail
            console.log("Perfil não encontrado, tentando criar...", error);
            const { data: { user } } = await supabaseClient.auth.getUser();
            if (user) {
                const name = user.email.split('@')[0];
                const { data: newProfile, error: insertError } = await supabaseClient
                    .from('perfis_jovens')
                    .insert({
                        id: user.id,
                        nome_completo: name.charAt(0).toUpperCase() + name.slice(1),
                        username: name + '_pregador',
                        creditos: 100,
                        tipo_plano: 'PREMIUM_ANUAL'
                    })
                    .select()
                    .single();
                if (insertError) throw insertError;
                userProfile = newProfile;
            }
        } else {
            userProfile = data;
        }
        
        if (userProfile) {
            showLoggedInUI(userProfile);
            updateCreditsUI();
            showToast(`Bem-vindo, @${userProfile.username}!`, "success");
            
            // Trigger onboarding check if terms not accepted
            if (!userProfile.aceitou_termos_lgpd) {
                // Reset steps
                elements.onboardStep1.classList.remove('hidden');
                elements.onboardStep2.classList.add('hidden');
                elements.onboardStep1Bar.classList.add('active');
                elements.onboardStep2Bar.classList.remove('active');
                elements.onboardStepIndicator.textContent = "Etapa 1 de 2";
                elements.btnOnboardNext.disabled = true;
                elements.chkLgpdConsent.checked = false;
                elements.btnOnboardSubmit.disabled = true;
                
                // Remove selection from previous options
                elements.onboardingOverlay.querySelectorAll('.onboard-option').forEach(o => o.classList.remove('selected'));
                onboardSelectedFocus = "";
                
                // Show onboarding overlay
                elements.onboardingOverlay.classList.remove('hidden');
            }
        }
    } catch (e) {
        console.error("Erro ao carregar perfil de usuário:", e);
        showToast("Erro ao sincronizar perfil do Supabase.", "error");
    }
}

function showLoggedInUI(profile) {
    if (elements.authSettingsLoggedOutState) elements.authSettingsLoggedOutState.classList.add('hidden');
    if (elements.authLoggedInState) elements.authLoggedInState.classList.remove('hidden');
    
    elements.userProfileName.textContent = profile.nome_completo;
    elements.userProfileUsername.textContent = `@${profile.username}`;
    elements.userProfileCredits.textContent = `${profile.creditos} Créditos / Energia`;
    elements.userProfileAvatar.textContent = profile.nome_completo.charAt(0).toUpperCase();
    
    // Superadmin verification
    let email = "";
    if (supabaseClient) {
        supabaseClient.auth.getUser().then(({ data }) => {
            if (data && data.user) {
                email = data.user.email;
                authUserEmail = email || "";
            }
            const isSuperAdmin = (email && email.toLowerCase() === 'admin@pregador.com') || 
                                (profile.username && profile.username.toLowerCase() === 'admin') || 
                                (profile.username && profile.username.toLowerCase() === 'superadmin') || 
                                profile.tipo_plano === 'SUPER_ADMIN';
                                
            if (isSuperAdmin) {
                elements.tabAdminBtn.classList.remove('hidden');
            } else {
                elements.tabAdminBtn.classList.add('hidden');
            }
            updateSettingsTabsVisibility();
        });
    } else {
        const isSuperAdmin = (profile.username && profile.username.toLowerCase() === 'admin') || 
                            (profile.username && profile.username.toLowerCase() === 'superadmin') || 
                            profile.tipo_plano === 'SUPER_ADMIN';
                            
        if (isSuperAdmin) {
            elements.tabAdminBtn.classList.remove('hidden');
        } else {
            elements.tabAdminBtn.classList.add('hidden');
        }
        updateSettingsTabsVisibility();
    }
}

function showLoggedOutUI() {
    if (elements.authSettingsLoggedOutState) elements.authSettingsLoggedOutState.classList.remove('hidden');
    if (elements.authLoggedInState) elements.authLoggedInState.classList.add('hidden');
    
    // Hide Admin tab when logged out
    elements.tabAdminBtn.classList.add('hidden');
    
    authUserEmail = "";
    updateSettingsTabsVisibility();
}

// Auth Subscriptions/Triggers
async function handleLogin() {
    const email = elements.loginEmail.value.trim();
    const password = elements.loginPassword.value;
    
    if (!email || !password) {
        showToast("Preencha todos os campos!", "error");
        return;
    }
    
    elements.btnSubmitLogin.disabled = true;
    const originalText = elements.btnSubmitLogin.innerHTML;
    elements.btnSubmitLogin.innerHTML = "<span>Autenticando...</span>";
    
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        if (data.session) {
            await loadUserProfile(data.session.user.id);
            syncSermons();
            hideAuthScreen();
            showToast("Acesso autorizado!", "success");
        }
    } catch (err) {
        showToast(err.message, "error");
    } finally {
        elements.btnSubmitLogin.disabled = false;
        elements.btnSubmitLogin.innerHTML = originalText;
    }
}

async function handleRegister() {
    const fullName = elements.registerName.value.trim();
    const username = elements.registerUsername.value.trim();
    const email = elements.registerEmail.value.trim();
    const password = elements.registerPassword.value;
    
    if (!fullName || !username || !email || !password) {
        showToast("Preencha todos os campos obrigatórios!", "error");
        return;
    }
    
    if (password.length < 6) {
        showToast("Senha deve ter no mínimo 6 caracteres!", "error");
        return;
    }
    
    elements.btnSubmitRegister.disabled = true;
    const originalText = elements.btnSubmitRegister.innerHTML;
    elements.btnSubmitRegister.innerHTML = "<span>Criando Conta...</span>";
    
    try {
        // 1. Sign up user
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password
        });
        
        if (error) throw error;
        
        if (data.user) {
            // 2. Insert profile record explicitly
            const { error: profileError } = await supabaseClient
                .from('perfis_jovens')
                .insert({
                    id: data.user.id,
                    nome_completo: fullName,
                    username: username,
                    creditos: 100,
                    tipo_plano: 'PREMIUM_ANUAL'
                });
                
            if (profileError) throw profileError;
            
            showToast("Cadastro concluído com sucesso!", "success");
            await loadUserProfile(data.user.id);
            syncSermons();
            hideAuthScreen();
        }
    } catch (err) {
        showToast(err.message, "error");
    } finally {
        elements.btnSubmitRegister.disabled = false;
        elements.btnSubmitRegister.innerHTML = originalText;
    }
}

async function handleLogout() {
    try {
        if (supabaseClient) {
            const { error } = await supabaseClient.auth.signOut();
            if (error) throw error;
        }
        
        userProfile = null;
        showLoggedOutUI();
        updateCreditsUI();
        syncSermons();
        showAuthScreen();
        showToast("Logout efetuado!", "success");
    } catch (err) {
        showToast(err.message, "error");
    }
}

function handleGuestBypass() {
    activateSimulationMode();
    hideAuthScreen();
    showToast("Entrando em Modo Simulação Local! Seus dados serão mantidos no navegador.", "success");
}

// --- Credits System & Animations ---
function updateCreditsUI() {
    let currentCredits = 100;
    
    if (supabaseClient && userProfile) {
        currentCredits = userProfile.creditos;
    } else {
        currentCredits = simulatedCredits;
    }
    
    // Safety cap
    currentCredits = Math.max(0, currentCredits);
    
    elements.creditsCount.textContent = currentCredits;
    elements.energyBar.style.width = `${currentCredits}%`;
    
    const mobileCredits = document.getElementById('mobileCreditsCount');
    if (mobileCredits) {
        mobileCredits.textContent = currentCredits;
    }
    
    // Gamification colors based on credit remaining
    if (currentCredits <= 20) {
        elements.energyBar.style.background = 'linear-gradient(90deg, var(--color-neon-pink), #FF5500)';
        elements.energyBar.style.boxShadow = '0 0 10px rgba(255, 0, 127, 0.6)';
    } else if (currentCredits <= 50) {
        elements.energyBar.style.background = 'linear-gradient(90deg, var(--color-neon-purple), var(--color-neon-cyan))';
        elements.energyBar.style.boxShadow = 'var(--glow-cyan)';
    } else {
        elements.energyBar.style.background = 'linear-gradient(90deg, var(--color-neon-purple), var(--color-neon-green))';
        elements.energyBar.style.boxShadow = 'var(--glow-green)';
    }
}

async function deductCredit() {
    if (supabaseClient && userProfile) {
        if (userProfile.creditos <= 0) return false;
        
        const newCredits = userProfile.creditos - 1;
        const { error } = await supabaseClient
            .from('perfis_jovens')
            .update({ creditos: newCredits })
            .eq('id', userProfile.id);
            
        if (error) {
            console.error("Erro ao debitar crédito no Supabase:", error);
            return false;
        }
        
        userProfile.creditos = newCredits;
        elements.userProfileCredits.textContent = `${newCredits} Créditos / Energia`;
    } else {
        if (simulatedCredits <= 0) return false;
        simulatedCredits -= 1;
        localStorage.setItem('app_pregador_mock_credits', simulatedCredits);
    }
    
    updateCreditsUI();
    triggerSparkleAnimation();
    return true;
}

function triggerSparkleAnimation() {
    const creditsPanel = document.getElementById('creditsPanel');
    const rect = creditsPanel.getBoundingClientRect();
    
    // Spawn 15 colorful energy particles floating out of the energy bar
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = i % 2 === 0 ? 'sparkle' : 'sparkle green';
        
        // Start position centered in panel
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        
        sparkle.style.left = `${startX}px`;
        sparkle.style.top = `${startY}px`;
        
        // Random flight vectors
        const angle = Math.random() * Math.PI * 2;
        const speed = 20 + Math.random() * 50;
        const tx = Math.cos(angle) * speed;
        const ty = Math.sin(angle) * speed;
        
        sparkle.style.setProperty('--tx', `${tx}px`);
        sparkle.style.setProperty('--ty', `${ty}px`);
        
        elements.sparklesContainer.appendChild(sparkle);
        
        // Cleanup particle
        setTimeout(() => {
            sparkle.remove();
        }, 1200);
    }
}

// --- Event Listeners and Routing ---
function setupEventListeners() {
    // Tabs Navigation
    elements.tabGenerateBtn.addEventListener('click', () => switchPane('generate'));
    elements.tabLibraryBtn.addEventListener('click', () => switchPane('library'));
    elements.tabMentoriaBtn.addEventListener('click', () => switchPane('mentoria'));
    elements.tabBibliaBtn.addEventListener('click', () => switchPane('biblia'));
    elements.tabAcademiaBtn.addEventListener('click', () => switchPane('academia'));
    
    // Settings Modal
    elements.openSettingsBtn.addEventListener('click', openSettingsModal);
    elements.closeSettingsBtn.addEventListener('click', closeSettingsModal);
    elements.saveSettingsBtn.addEventListener('click', saveConfig);
    elements.clearSettingsBtn.addEventListener('click', resetConfig);
    
    // Modal tabs toggle
    elements.tabSettingsApiBtn.addEventListener('click', () => switchSettingsModalTab('api'));
    elements.tabSettingsAuthBtn.addEventListener('click', () => switchSettingsModalTab('auth'));
    
    // Fullscreen Auth Screen Listeners
    elements.btnSwitchLogin.addEventListener('click', () => switchAuthTab('login'));
    elements.btnSwitchRegister.addEventListener('click', () => switchAuthTab('register'));
    elements.formLogin.addEventListener('submit', (e) => { e.preventDefault(); handleLogin(); });
    elements.formRegister.addEventListener('submit', (e) => { e.preventDefault(); handleRegister(); });
    elements.btnGuestBypass.addEventListener('click', handleGuestBypass);
    elements.btnSettingsOpenAuth.addEventListener('click', () => {
        closeSettingsModal();
        showAuthScreen();
    });
    elements.submitLogoutBtn.addEventListener('click', handleLogout);
    
    // Vibe Chips (Mutually select & limit selection to 2 pain, 2 pop tags)
    elements.painChips.forEach(chip => {
        chip.addEventListener('click', () => toggleChip(chip, 'pain'));
    });
    
    elements.popChips.forEach(chip => {
        chip.addEventListener('click', () => toggleChip(chip, 'pop'));
    });
    
    // Generate Sermon Button Trigger
    elements.generateSermonBtn.addEventListener('click', generateSermon);
    
    // Saved sermon trigger from empty state
    elements.emptyStateGenerateBtn.addEventListener('click', () => switchPane('generate'));
    
    // Action Outputs
    elements.saveSermonBtn.addEventListener('click', () => saveActiveSermon(true));
    elements.pulpitModeBtn.addEventListener('click', openPulpitMode);
    elements.copyReelsBtn.addEventListener('click', copyReelsScriptToClipboard);
    elements.copyFullSermonBtn.addEventListener('click', copyFullSermonToClipboard);
    elements.backToGeneratorBtn.addEventListener('click', () => {
        document.querySelector('.panel-header').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Library interactions
    elements.librarySearchInput.addEventListener('input', filterSavedLibrary);
    elements.filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            elements.filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterSavedLibrary();
        });
    });
    
    // Pulpit Mode Actions
    elements.pulpitCloseBtn.addEventListener('click', closePulpitMode);
    elements.fontSizeDecBtn.addEventListener('click', () => adjustPulpitFontSize(-4));
    elements.fontSizeIncBtn.addEventListener('click', () => adjustPulpitFontSize(4));
    
    elements.speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.speedBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSpeed = parseInt(btn.dataset.speed, 10);
            toggleAutoScroll();
        });
    });
    
    // Pulpit Timer controls
    elements.pulpitTimerPlayBtn.addEventListener('click', togglePulpitTimer);
    elements.pulpitTimerResetBtn.addEventListener('click', resetPulpitTimer);
    
    // Configurable Pulpit Timer via clicking display
    elements.pulpitTimer.addEventListener('click', () => {
        if (isTimerRunning) {
            showToast("Pausa o cronômetro antes de configurar o tempo! ⏱️", "warning");
            return;
        }
        const currentMins = Math.floor(secondsRemaining / 60);
        const newTimeStr = prompt("Configure o tempo do sermão (em minutos):", currentMins);
        if (newTimeStr !== null) {
            const minutes = parseInt(newTimeStr, 10);
            if (isNaN(minutes) || minutes <= 0 || minutes > 180) {
                showToast("Por favor, insira um tempo válido entre 1 e 180 minutos!", "error");
                return;
            }
            pulpitConfiguredTimeSeconds = minutes * 60;
            secondsRemaining = pulpitConfiguredTimeSeconds;
            updateTimerDisplay();
            showToast(`Tempo configurado para ${minutes} minutos! ⏱️`, "success");
        }
    });

    // Mentorship Chat listeners
    elements.backToMentorsBtn.addEventListener('click', backToMentors);
    elements.mentoriaForm.addEventListener('submit', submitMentorQuestion);

    // Bible readers dropdown listeners
    elements.bibleBookSelect.addEventListener('change', loadBibleVerseList);
    elements.bibleChapterSelect.addEventListener('change', loadBibleVerseList);

    // Bible Floating Context Action listeners
    elements.btnGenIcebreaker.addEventListener('click', () => triggerBibleAction('quebra-gelo'));
    elements.btnTranslateGenZ.addEventListener('click', () => triggerBibleAction('traducao'));
    elements.btnBibleCopy.addEventListener('click', copySelectedVerse);
    elements.btnBibleShare.addEventListener('click', shareSelectedVerse);
    elements.btnBibleSendChat.addEventListener('click', submitBibleChatRefine);
    elements.bibleChatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitBibleChatRefine();
        }
    });
    elements.closeBibleModalBtn.addEventListener('click', () => {
        elements.bibleActionModal.classList.add('hidden');
    });
    
    // Bible color dots highlighting
    const colorDots = elements.bibleFloatingMenu.querySelectorAll('.color-dot');
    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const color = dot.dataset.color;
            applyHighlight(color);
            elements.bibleFloatingMenu.classList.add('hidden');
        });
    });

    // Academy RPG listeners
    elements.closeLessonModalBtn.addEventListener('click', () => elements.lessonReaderModal.classList.add('hidden'));
    elements.closeLessonModalFooterBtn.addEventListener('click', () => elements.lessonReaderModal.classList.add('hidden'));
    elements.completeLessonBtn.addEventListener('click', () => {
        const lessonId = parseInt(elements.completeLessonBtn.dataset.lessonId, 10);
        completeAcademyLesson(lessonId);
    });

    // Recharge Credit listeners
    elements.tabRecargaBtn.addEventListener('click', () => switchPane('recarga'));
    elements.btnPayPix.addEventListener('click', () => selectPaymentMethod('pix'));
    elements.btnPayCard.addEventListener('click', () => selectPaymentMethod('cartao'));
    elements.btnSubmitRecharge.addEventListener('click', handleRechargeCheckout);
    
    // Package selection listeners
    const rechargeCards = elements.paneRecarga.querySelectorAll('.package-card');
    rechargeCards.forEach(card => {
        card.addEventListener('click', () => {
            rechargeCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectRechargePackage(card.dataset.packageId);
        });
    });

    // Onboarding UI event listeners
    const onboardOptions = elements.onboardingOverlay.querySelectorAll('.onboard-option');
    onboardOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            onboardOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            onboardSelectedFocus = opt.dataset.focus;
            elements.btnOnboardNext.disabled = false;
        });
    });

    elements.btnOnboardNext.addEventListener('click', () => {
        elements.onboardStep1.classList.add('hidden');
        elements.onboardStep2.classList.remove('hidden');
        elements.onboardStep2Bar.classList.add('active');
        elements.onboardStepIndicator.textContent = "Etapa 2 de 2";
    });

    elements.chkLgpdConsent.addEventListener('change', (e) => {
        onboardTermsAccepted = e.target.checked;
        elements.btnOnboardSubmit.disabled = !onboardTermsAccepted;
    });

    elements.btnOnboardSubmit.addEventListener('click', submitOnboardingData);
    
    // Admin Panel listeners
    elements.tabAdminBtn.addEventListener('click', () => switchPane('admin'));
    elements.btnAdminSearch.addEventListener('click', handleAdminUserSearch);
    
    // Collapsible Sidebar & Dedicated Sermon view listeners
    elements.btnCollapseSidebar.addEventListener('click', toggleSidebarCollapse);
    elements.backToGeneratorBtn.addEventListener('click', () => switchPane('generate'));
}

function switchPane(view) {
    elements.tabGenerateBtn.classList.remove('active');
    elements.tabLibraryBtn.classList.remove('active');
    elements.tabMentoriaBtn.classList.remove('active');
    elements.tabBibliaBtn.classList.remove('active');
    elements.tabAcademiaBtn.classList.remove('active');
    elements.tabRecargaBtn.classList.remove('active');
    elements.tabAdminBtn.classList.remove('active');
    
    elements.paneGenerate.classList.remove('active');
    elements.paneLibrary.classList.remove('active');
    elements.paneMentoria.classList.remove('active');
    elements.paneBiblia.classList.remove('active');
    elements.paneAcademia.classList.remove('active');
    elements.paneRecarga.classList.remove('active');
    elements.paneAdmin.classList.remove('active');
    elements.paneSermonReader.classList.remove('active');
    
    if (view === 'generate') {
        elements.tabGenerateBtn.classList.add('active');
        elements.paneGenerate.classList.add('active');
    } else if (view === 'library') {
        elements.tabLibraryBtn.classList.add('active');
        elements.paneLibrary.classList.add('active');
        syncSermons(); 
    } else if (view === 'mentoria') {
        elements.tabMentoriaBtn.classList.add('active');
        elements.paneMentoria.classList.add('active');
        renderMentorshipHub();
    } else if (view === 'biblia') {
        elements.tabBibliaBtn.classList.add('active');
        elements.paneBiblia.classList.add('active');
        loadBibleVerseList();
    } else if (view === 'academia') {
        elements.tabAcademiaBtn.classList.add('active');
        elements.paneAcademia.classList.add('active');
        renderAcademyProgress();
    } else if (view === 'recarga') {
        elements.tabRecargaBtn.classList.add('active');
        elements.paneRecarga.classList.add('active');
        renderRechargePane();
    } else if (view === 'admin') {
        elements.tabAdminBtn.classList.add('active');
        elements.paneAdmin.classList.add('active');
    } else if (view === 'sermonReader') {
        elements.paneSermonReader.classList.add('active');
    }
}

// --- Chips logic ---
function toggleChip(chip, type) {
    const activeClass = 'selected';
    const tag = chip.dataset.vibe;
    
    if (type === 'pain') {
        if (chip.classList.contains(activeClass)) {
            chip.classList.remove(activeClass);
            selectedPainVibes = selectedPainVibes.filter(v => v !== tag);
        } else {
            if (selectedPainVibes.length >= 2) {
                showToast("Escolha no máximo 2 vibes de Dores Reais!", "error");
                return;
            }
            chip.classList.add(activeClass);
            selectedPainVibes.push(tag);
        }
    } else {
        if (chip.classList.contains(activeClass)) {
            chip.classList.remove(activeClass);
            selectedPopVibes = selectedPopVibes.filter(v => v !== tag);
        } else {
            if (selectedPopVibes.length >= 2) {
                showToast("Escolha no máximo 2 tags de Cultura Pop!", "error");
                return;
            }
            chip.classList.add(activeClass);
            selectedPopVibes.push(tag);
        }
    }
}

// --- Settings Modal Navigation ---
function openSettingsModal() {
    elements.settingsModal.classList.remove('hidden');
    switchSettingsModalTab('api');
}

function closeSettingsModal() {
    elements.settingsModal.classList.add('hidden');
}

function switchSettingsModalTab(tab) {
    elements.tabSettingsApiBtn.classList.remove('active');
    elements.tabSettingsAuthBtn.classList.remove('active');
    elements.paneSettingsApi.classList.remove('active');
    elements.paneSettingsAuth.classList.remove('active');
    
    if (tab === 'api') {
        elements.tabSettingsApiBtn.classList.add('active');
        elements.paneSettingsApi.classList.add('active');
    } else {
        elements.tabSettingsAuthBtn.classList.add('active');
        elements.paneSettingsAuth.classList.add('active');
    }
}

function switchAuthTab(mode) {
    elements.btnSwitchLogin.classList.remove('active');
    elements.btnSwitchRegister.classList.remove('active');
    elements.formLogin.classList.add('hidden');
    elements.formRegister.classList.add('hidden');
    
    if (mode === 'login') {
        elements.btnSwitchLogin.classList.add('active');
        elements.formLogin.classList.remove('hidden');
    } else {
        elements.btnSwitchRegister.classList.add('active');
        elements.formRegister.classList.remove('hidden');
    }
}

function showAuthScreen() {
    if (elements.authScreen) elements.authScreen.classList.remove('hidden');
    if (elements.appHeader) elements.appHeader.classList.add('hidden');
    if (elements.appContainer) elements.appContainer.classList.add('hidden');
}

function hideAuthScreen() {
    if (elements.authScreen) elements.authScreen.classList.add('hidden');
    if (elements.appHeader) elements.appHeader.classList.remove('hidden');
    if (elements.appContainer) elements.appContainer.classList.remove('hidden');
}

// --- Sermon Generator Logic (Groq API vs Dynamic Simulation) ---
async function generateSermon() {
    // 1. Validations
    if (selectedPainVibes.length === 0) {
        showToast("Escolha pelo menos 1 vibe de Dor Real!", "error");
        return;
    }
    
    const creditsLeft = supabaseClient && userProfile ? userProfile.creditos : simulatedCredits;
    if (creditsLeft <= 0) {
        showToast("Energia zerada! Carregue mais créditos ou resete as configurações.", "error");
        return;
    }
    
    // Set loading state
    elements.generateSermonBtn.disabled = true;
    elements.generateSermonBtn.querySelector('span:last-child').textContent = "Processando Mensagem...";
    elements.sermonOutputWrapper.classList.add('hidden');
    
    const customRef = elements.customReference.value.trim();
    const customTheme = elements.sermonTopic.value.trim();
    
    try {
        let sermonContent = "";
        let usedEdgeFunction = false;
        
        // 2. Decide if using actual Supabase Edge Function or local Groq or Simulation Fallback
        if (config.supabaseUrl && supabaseClient && userProfile) {
            sermonContent = await fetchEdgeFunctionSermon(customRef, customTheme);
            usedEdgeFunction = true;
        } else if (config.groqKey) {
            sermonContent = await fetchGroqAIResponse(customRef, customTheme);
        } else {
            // Dynamic simulator wrapper
            sermonContent = await simulateAIResponse(customRef, customTheme);
        }
        
        // 3. Deduct credit (only if NOT processed by Edge Function to prevent double deduction)
        if (!usedEdgeFunction) {
            const success = await deductCredit();
            if (!success) throw new Error("Erro de processamento de créditos.");
        }
        
        // 4. Render output
        currentActiveSermon = {
            titulo_viral: extractTitleFromMarkdown(sermonContent),
            tema_solicitado: selectedPainVibes.join(', ') + (customTheme ? ` (${customTheme})` : ''),
            referencia_pop: selectedPopVibes.join(', ') + (customRef ? ` (${customRef})` : ''),
            conteudo_markdown: sermonContent,
            favorito: false
        };
        
        elements.sermonBody.innerHTML = marked.parse(sermonContent);
        elements.sermonReadTitle.textContent = currentActiveSermon.titulo_viral;
        elements.insightVibeVal.textContent = selectedPainVibes.join(', ') + (customTheme ? ` (${customTheme})` : '');
        elements.insightPopVal.textContent = selectedPopVibes.join(', ') + (customRef ? ` (${customRef})` : '');
        elements.insightDateVal.textContent = new Date().toLocaleDateString('pt-BR');
        
        // Extract Reels bonus script block
        const reelsScript = extractReelsScript(sermonContent);
        elements.reelsCodeContent.textContent = reelsScript;
        
        // Switch to dedicated sermon reader view
        elements.sermonOutputWrapper.classList.remove('hidden');
        switchPane('sermonReader');
        
        showToast("Mensagem gerada com sucesso! 🔥", "success");
        
    } catch (err) {
        console.error(err);
        showToast(`Erro na geração: ${err.message}`, "error");
    } finally {
        elements.generateSermonBtn.disabled = false;
        elements.generateSermonBtn.querySelector('span:last-child').textContent = "Gerar Mensagem Viral";
    }
}

async function fetchEdgeFunctionSermon(customRef, customTheme) {
    const edgeUrl = `${config.supabaseUrl}/functions/v1/pregador-core`;
    const token = supabaseClient?.auth?.session()?.access_token || localStorage.getItem('supabase_token') || '';
    
    const response = await fetch(edgeUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            acao: 'GERAR_SERMAO',
            payload: {
                tema: customTheme || selectedPainVibes.join(', '),
                publicoAlvo: "Gen Z (13-18 anos)",
                tagVibe: selectedPainVibes.join(', ') + (selectedPopVibes.length > 0 ? ' + ' + selectedPopVibes.join(', ') : '')
            }
        })
    });
    
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    
    // Sync local profile credits with the value returned by the server
    if (data.novosCreditos !== undefined && userProfile) {
        userProfile.creditos = data.novosCreditos;
        updateCreditsUI();
    }
    
    return data.resultado;
}

async function fetchGroqAIResponse(customRef, customTheme) {
    const systemPrompt = `Você é o "Cérebro Conectado 2.0", um teólogo Ph.D. especialista em comunicação com as Gerações Z e Alpha. Sua missão é estruturar esboços de mensagens, sermões e dinâmicas de células com profundidade bíblica ortodoxa, mas usando uma roupagem visual, rápida e imersiva.

DIRETRIZES DE COMUNICAÇÃO:
1. NUNCA use jargões eclesiásticos antigos sem explicá-los de forma leve (Ex: em vez de apenas falar "Santificação", explique como "uma atualização de software na sua mentalidade").
2. Evite gírias forçadas de adultos tentando parecer jovens. Em vez disso, use analogias baseadas em conceitos estruturais modernos: Algoritmos de redes sociais, Bugs e Glitches (para falar sobre pecado/erros), Modo Foco, Skins e Identidade Digital, Feed de Notícias, Maratonar séries, Mecânicas de Jogos de RPG/FPS.
3. Se o usuário fornecer uma referência da cultura pop (filmes, animes, jogos, músicas), use-a como o "Gancho de Atenção" inicial da mensagem.

ESTRUTURA OBRIGATÓRIA DA RESPOSTA (Formatada estritamente em Markdown):

# 🎯 [Inserir Título Magnético e Viral estilo Reels/TikTok]

## ⚡ 1. O Gancho Cultural (Primeiros 3 segundos)
[Analogia direta entre o tema da cultura pop/cotidiano digital e o problema real do jovem de forma rápida e impactante].

## 🎲 2. Quebra-Gelo / Dinâmica "Derrete-Gelo"
- **Nome da Atividade:** [Nome chamativo]
- **Como Funciona:** [Instruções rápidas de 1 parágrafo para fazer na célula/GC usando apenas celulares ou objetos comuns].

## 📖 3. O Download Bíblico (Profundidade com Simplicidade)
- **Base:** [Referências bíblicas].
- **A Chave Oculta:** [Explicação do contexto histórico do versículo de um jeito que faça sentido para o cérebro hiperestimulado de hoje].

## 🎬 4. Roteiro Pronto: Reels/Shorts do Líder (Bônus Copywriter)
- **Gancho em áudio (0-3s):** "[Frase de impacto]"
- **Legenda descritiva do Post:** "[Texto magnético curto para o Instagram do ministério com 4 hashtags estratégicas]".

## 🏆 5. O Desafio da Semana (Aplicação Prática Real)
[Uma missão clara, mensurável e desafiadora para o jovem executar no colégio, faculdade ou internet até o próximo encontro].`;

    const userMessage = `Gere um sermão com as seguintes especificações:
- Vibes / Dores Reais: ${selectedPainVibes.join(', ')}
- Tags Pop: ${selectedPopVibes.join(', ')}
- Gancho Pop Específico (Opcional): ${customRef || 'Não especificado'}
- Tema Central (Opcional): ${customTheme || 'Geral'}

Lembre-se de retornar estritamente a resposta formatada nos cabeçalhos Markdown indicados nas diretrizes do sistema.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${config.groqKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ],
            temperature: 0.75,
            max_tokens: 1400
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `Erro HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// --- Dynamic Fallback Mock AI Sermon Engine ---
function simulateAIResponse(customRef, customTheme) {
    return new Promise((resolve) => {
        // Simple 1.5s delay to represent processing
        setTimeout(() => {
            const vibe = selectedPainVibes[0];
            const pop = selectedPopVibes[0] || 'Trends das Redes';
            const ref = customRef || (pop === 'Anime/Geek' ? 'Naruto' : pop === 'Jogos/RPG/FPS' ? 'Valorant/RPG' : 'TikTok Algorithm');
            const theme = customTheme || 'Superação';
            
            let markdown = "";
            
            if (vibe === "Ansiedade") {
                markdown = `# 🎯 Como Vencer a Ansiedade e o "Lag" Mental no Multiverso

## ⚡ 1. O Gancho Cultural (Primeiros 3 segundos)
Sabe quando o seu ping sobe no meio de uma partida competitiva de ${ref} ou o feed do TikTok atualiza de uma vez e você sente que seu processador interno travou? Esse lag mental, na vida real, chama-se ansiedade. Tentamos abrir 50 abas no navegador do cérebro, dando alt+tab frenético no que os outros pensam de nós e no nosso futuro, e o resultado é um glitch total do sistema.

## 🎲 2. Quebra-Gelo / Dinâmica "Derrete-Gelo"
- **Nome da Atividade:** Sentido Aranha / Modo Avião
- **Como Funciona:** Peça para todos colocarem o cronômetro do celular em 60 segundos com a tela virada para baixo. O desafio é levantar a mão exatamente quando acharem que passou 1 minuto, sem olhar. Quem errar por mais tempo demonstra o quanto nosso cérebro está hiperestimulado e sem timing de foco.

## 📖 3. O Download Bíblico (Profundidade com Simplicidade)
- **Base:** Filipenses 4:6-7.
- **A Chave Oculta:** O apóstolo Paulo enviou essa carta de uma prisão romana. Ele estava sem conexão de dados e sob "pressão de ban". A palavra original para ansiedade é *merimnao*, que significa literalmenter "puxado em direções opostas". É o bug de tentar rodar processos pesados sem largura de banda espiritual. A chave oculta é dar o comando "limpar cache" via oração, liberando a memória RAM espiritual.

## 🎬 4. Roteiro Pronto: Reels/Shorts do Líder (Bônus Copywriter)
- **Gancho em áudio (0-3s):** "O seu processador mental tá travando de ansiedade? Talvez você esteja rodando processos que não são seus!"
- **Legenda descritiva do Post:** "Não adianta dar Alt+F4 nos problemas. A paz de Deus é o antivírus que protege seu coração contra os vírus do medo. 🤖⚡ #Ansiedade #Foco #JovemCristão #ConexãoDeDeus"

## 🏆 5. O Desafio da Semana (Aplicação Prática Real)
Realize o 'Shutdown Digital': Escolha um dia da semana para desligar completamente o celular a partir das 20h. Use essa noite para ler, orar e organizar seu foco offline.`;
            } else if (vibe === "Identidade") {
                markdown = `# 🎯 Identidade Digital vs Sua Skin Real: Quem você é quando desliga a tela?

## ⚡ 1. O Gancho Cultural (Primeiros 3 segundos)
No ${ref}, gastamos horas e até dinheiro real para conseguir a melhor skin e construir um perfil lendário. Mas a verdade é que, às vezes, estamos tão ocupados personalizando nosso avatar social que quando desligamos o console ou fechamos o Instagram, sentimos um vazio absurdo sobre a nossa verdadeira identidade. Estamos vivendo de filtros e skins virtuais, esquecendo de quem somos na vida real.

## 🎲 2. Quebra-Gelo / Dinâmica "Derrete-Gelo"
- **Nome da Atividade:** Revelando o Avatar
- **Como Funciona:** Cada pessoa deve mostrar a última foto salva na galeria do celular e contar a história real por trás dela, revelando se a foto mostrava uma "skin perfeita" ou a vida real com glitches cotidianos.

## 📖 3. O Download Bíblico (Profundidade com Simplicidade)
- **Base:** Gênesis 1:27 e Efésios 2:10.
- **A Chave Oculta:** Na Bíblia grega, a palavra para obra-prima é *poiema* (de onde vem poesia). Você não é um clone gerado por algoritmo ou uma inteligência artificial padrão. Você é o design original do Criador. O pecado opera como um "hack" que altera seus atributos de fábrica, mas em Cristo você recebe uma restauração completa do seu código-fonte original.

## 🎬 4. Roteiro Pronto: Reels/Shorts do Líder (Bônus Copywriter)
- **Gancho em áudio (0-3s):** "Você tá gastando mais energia com a sua skin virtual ou com o seu coração real?"
- **Legenda descritiva do Post:** "A sua verdadeira identidade não vem do número de likes ou do tier da sua conta, mas sim de quem te criou de forma exclusiva. 🧬👑 #Identidade #SkinReal #GeraçãoZ #MinisterioJovem"

## 🏆 5. O Desafio da Semana (Aplicação Prática Real)
Desafio 'Espelho Limpo': Escreva "Obra-Prima Original" com uma caneta que apague ou em um post-it no espelho do seu quarto. Toda vez que olhar para ele, lembre-se do seu código original de fábrica divina.`;
            } else {
                // General purpose theme generator
                markdown = `# 🎯 Resetando o Sistema: Desbloqueando a Força Real para Vencer ${theme}

## ⚡ 1. O Gancho Cultural (Primeiros 3 segundos)
A cultura pop atual de ${ref} está sempre tentando impor regras de como devemos viver, vestir e nos comportar, gerando sentimentos de ${vibe}. Mas e se o verdadeiro caminho não for seguir o hype do algoritmo mundial, mas sim realizar um reset de fábrica completo guiado por princípios eternos?

## 🎲 2. Quebra-Gelo / Dinâmica "Derrete-Gelo"
- **Nome da Atividade:** Reset de Senha
- **Como Funciona:** Em duplas, cada um deve listar um "aplicativo desnecessário" (hábito ou comparação) que tem consumido bateria emocional e dar um feedback positivo de 30 segundos sobre como desinstalar isso de vez.

## 📖 3. O Download Bíblico (Profundidade com Simplicidade)
- **Base:** Romanos 12:2.
- **A Chave Oculta:** O texto fala sobre "não se conformar". No grego antigo, a palavra é *schema*, que significa o modelo temporário de fora. É exatamente como um layout ou template que a internet tenta colar em você. Paulo diz para atualizar o firmware do seu cérebro (*metanoia*) para que você entenda o código de Deus que é bom, perfeito e agradável.

## 🎬 4. Roteiro Pronto: Reels/Shorts do Líder (Bônus Copywriter)
- **Gancho em áudio (0-3s):** "O algoritmo do mundo tá ditando as suas escolhas ou você já fez a atualização de sistema do Espírito?"
- **Legenda descritiva do Post:** "Desconecte do hype raso e conecte-se com a palavra que renova sua mente. ⚡🔥 #MensagemReal #Espiritualidade #LiderançaJovem #${theme.replace(/\s+/g, '')}"

## 🏆 5. O Desafio da Semana (Aplicação Prática Real)
Desafio 'Modo Foco': Bloqueie notificações de redes sociais durantes as manhãs desta semana e dedique os primeiros 10 minutos do dia para ler a Bíblia antes de ver qualquer feed.`;
            }
            
            showToast("Modo Simulação: Gerado localmente com sucesso!", "info");
            resolve(markdown);
        }, 1500);
    });
}

// --- Clipboard Actions ---
function copyReelsScriptToClipboard() {
    const codeArea = elements.reelsCodeContent.textContent;
    
    navigator.clipboard.writeText(codeArea).then(() => {
        showToast("Roteiro Reels copiado! Bento Reels 🔥", "success");
    }).catch(err => {
        console.error("Falha ao copiar:", err);
        showToast("Erro ao copiar roteiro.", "error");
    });
}

function copyFullSermonToClipboard() {
    if (!currentActiveSermon) return;
    
    navigator.clipboard.writeText(currentActiveSermon.conteudo_markdown).then(() => {
        showToast("Esboço de sermão completo copiado! Pronto para pregar 🔥", "success");
    }).catch(err => {
        console.error("Falha ao copiar:", err);
        showToast("Erro ao copiar sermão.", "error");
    });
}

// --- Extractors ---
function extractTitleFromMarkdown(md) {
    const match = md.match(/# 🎯 (.+)/);
    return match ? match[1].trim() : "Mensagem de Impacto";
}

function extractReelsScript(md) {
    const reelsRegex = /## 🎬 4\. Roteiro Pronto: Reels\/Shorts do Líder \(Bônus Copywriter\)[\s\S]*?(?=## 🏆 5\. O Desafio da Semana|$)/;
    const match = md.match(reelsRegex);
    if (match) {
        return match[0].replace('## 🎬 4. Roteiro Pronto: Reels/Shorts do Líder (Bônus Copywriter)', '').trim();
    }
    return "Script do Reels não formatado adequadamente na resposta da IA.";
}

// --- Save and DB Sync workflows ---
async function saveActiveSermon(showMessage = false) {
    if (!currentActiveSermon) {
        if (showMessage) showToast("Não há sermão ativo para salvar!", "error");
        return;
    }
    
    if (supabaseClient && userProfile) {
        try {
            // Save to Supabase DB
            const { data, error } = await supabaseClient
                .from('sermoes_salvos')
                .insert({
                    usuario_id: userProfile.id,
                    titulo_viral: currentActiveSermon.titulo_viral,
                    tema_solicitado: currentActiveSermon.tema_solicitado,
                    referencia_pop: currentActiveSermon.referencia_pop,
                    conteudo_markdown: currentActiveSermon.conteudo_markdown,
                    favorito: false
                })
                .select()
                .single();
                
            if (error) throw error;
            
            if (showMessage) showToast("Sermão salvo na nuvem do Supabase! 💾", "success");
            await syncSermons();
        } catch (e) {
            console.error("Erro ao salvar sermão no Supabase:", e);
            showToast("Falha ao salvar no banco. Tentando salvar no banco local...", "error");
            saveSermonLocally(showMessage);
        }
    } else {
        saveSermonLocally(showMessage);
    }
}

function saveSermonLocally(showMessage) {
    const localSermon = {
        ...currentActiveSermon,
        id: Date.now(), // Generate virtual integer primary key
        created_at: new Date().toISOString()
    };
    
    simulatedSermons.unshift(localSermon);
    localStorage.setItem('app_pregador_mock_sermons', JSON.stringify(simulatedSermons));
    
    if (showMessage) showToast("Sermão salvo localmente no seu dispositivo! 💾", "success");
    renderLibrary();
}

async function syncSermons() {
    if (supabaseClient && userProfile) {
        try {
            const { data, error } = await supabaseClient
                .from('sermoes_salvos')
                .select('*')
                .eq('usuario_id', userProfile.id)
                .order('created_at', { ascending: false });
                
            if (error) throw error;
            savedSermons = data || [];
        } catch (e) {
            console.error("Erro ao carregar sermões do Supabase:", e);
            // Fallback to local
            savedSermons = simulatedSermons;
        }
    } else {
        savedSermons = simulatedSermons;
    }
    
    renderLibrary();
}

function renderLibrary() {
    elements.libraryGrid.innerHTML = "";
    
    const searchVal = elements.librarySearchInput.value.toLowerCase().trim();
    const activeFilterTab = document.querySelector('.filter-tab.active').dataset.filter;
    
    let list = [...savedSermons];
    
    // Apply filters
    if (activeFilterTab === 'favs') {
        list = list.filter(s => s.favorito);
    }
    
    if (searchVal) {
        list = list.filter(s => 
            s.titulo_viral.toLowerCase().includes(searchVal) ||
            s.tema_solicitado.toLowerCase().includes(searchVal) ||
            s.referencia_pop.toLowerCase().includes(searchVal)
        );
    }
    
    if (list.length === 0) {
        elements.libraryGrid.innerHTML = `
            <div class="no-sermons-state">
                <div class="empty-icon">📂</div>
                <p>Nenhum sermão encontrado para esta busca.</p>
                <button class="btn btn-secondary btn-sm" onclick="switchPane('generate')">Criar Nova Mensagem</button>
            </div>
        `;
        return;
    }
    
    list.forEach(sermon => {
        const card = document.createElement('div');
        card.className = "sermon-card";
        
        const dateFormatted = new Date(sermon.created_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        
        card.innerHTML = `
            <div class="sermon-card-header">
                <h4 class="sermon-card-title">${sermon.titulo_viral}</h4>
                <button class="favorite-btn ${sermon.favorito ? 'active' : ''}" onclick="toggleFavorite(${sermon.id || sermon.id}, event)">★</button>
            </div>
            <div class="sermon-card-meta">
                <span class="meta-badge meta-vibe">${sermon.tema_solicitado}</span>
                <span class="meta-badge meta-pop">${sermon.referencia_pop}</span>
            </div>
            <div class="sermon-card-footer">
                <span class="card-date">${dateFormatted}</span>
                <div class="card-actions">
                    <button class="card-action-btn btn-view-card" onclick="loadSermonToPulpit(${sermon.id}, event)" title="Abrir Modo Púlpito">
                        🎤
                    </button>
                    <button class="card-action-btn btn-delete-card" onclick="deleteSermon(${sermon.id}, event)" title="Excluir">
                        🗑️
                    </button>
                </div>
            </div>
        `;
        
        // Allow clicking on the card itself to view the markdown back in Generator
        card.addEventListener('click', () => {
            currentActiveSermon = sermon;
            elements.sermonBody.innerHTML = marked.parse(sermon.conteudo_markdown);
            elements.sermonReadTitle.textContent = sermon.titulo_viral;
            elements.insightVibeVal.textContent = sermon.tema_solicitado;
            elements.insightPopVal.textContent = sermon.referencia_pop;
            elements.insightDateVal.textContent = new Date(sermon.created_at).toLocaleDateString('pt-BR');
            
            elements.reelsCodeContent.textContent = extractReelsScript(sermon.conteudo_markdown);
            elements.sermonOutputWrapper.classList.remove('hidden');
            switchPane('sermonReader');
        });
        
        elements.libraryGrid.appendChild(card);
    });
}

function filterSavedLibrary() {
    renderLibrary();
}

window.toggleFavorite = async function(sermonId, event) {
    event.stopPropagation(); // Avoid triggering card click
    
    let sermonIndex = savedSermons.findIndex(s => s.id == sermonId);
    if (sermonIndex === -1) return;
    
    const newFavVal = !savedSermons[sermonIndex].favorito;
    
    if (supabaseClient && userProfile) {
        try {
            const { error } = await supabaseClient
                .from('sermoes_salvos')
                .update({ favorito: newFavVal })
                .eq('id', sermonId);
            if (error) throw error;
            savedSermons[sermonIndex].favorito = newFavVal;
            showToast(newFavVal ? "Adicionado aos favoritos! ★" : "Removido dos favoritos.", "info");
        } catch (e) {
            console.error(e);
            showToast("Falha ao favoritar.", "error");
        }
    } else {
        // Simulated local list favoriting
        const mockIdx = simulatedSermons.findIndex(s => s.id == sermonId);
        if (mockIdx !== -1) {
            simulatedSermons[mockIdx].favorito = newFavVal;
            localStorage.setItem('app_pregador_mock_sermons', JSON.stringify(simulatedSermons));
            savedSermons = simulatedSermons;
            showToast(newFavVal ? "Adicionado aos favoritos! ★" : "Removido dos favoritos.", "info");
        }
    }
    
    renderLibrary();
};

window.deleteSermon = async function(sermonId, event) {
    event.stopPropagation(); // Avoid card click
    
    if (!confirm("Tem certeza que deseja excluir esta mensagem?")) return;
    
    if (supabaseClient && userProfile) {
        try {
            const { error } = await supabaseClient
                .from('sermoes_salvos')
                .delete()
                .eq('id', sermonId);
            if (error) throw error;
            showToast("Mensagem removida!", "success");
            await syncSermons();
        } catch (e) {
            console.error(e);
            showToast("Erro ao deletar mensagem.", "error");
        }
    } else {
        // Simulated list delete
        simulatedSermons = simulatedSermons.filter(s => s.id != sermonId);
        localStorage.setItem('app_pregador_mock_sermons', JSON.stringify(simulatedSermons));
        savedSermons = simulatedSermons;
        showToast("Mensagem removida localmente!", "success");
        renderLibrary();
    }
};

window.loadSermonToPulpit = function(sermonId, event) {
    event.stopPropagation();
    const sermon = savedSermons.find(s => s.id == sermonId);
    if (!sermon) return;
    
    currentActiveSermon = sermon;
    openPulpitMode();
};

// --- Fullscreen Pulpit Mode & Auto Scroll Teleprompter ---
function openPulpitMode() {
    if (!currentActiveSermon) {
        showToast("Por favor, gere ou selecione uma mensagem primeiro!", "error");
        return;
    }
    
    elements.pulpitContent.innerHTML = marked.parse(currentActiveSermon.conteudo_markdown);
    elements.pulpitOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Lock base scroll
    
    // Reset teleprompter velocity and timer parameters
    currentSpeed = 0;
    elements.speedBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.speed == '0') btn.classList.add('active');
    });
    
    // Responsive starting font size (20px on mobile, 32px on desktop)
    const isMobile = window.innerWidth <= 768;
    activeFontSize = isMobile ? 20 : 32;
    
    adjustPulpitFontSize(0); // sync DOM fonts
    resetPulpitTimer();
}

function closePulpitMode() {
    elements.pulpitOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto'; // release scroll lock
    
    // Turn off scrolling logic
    currentSpeed = 0;
    if (scrollIntervalId) {
        cancelAnimationFrame(scrollIntervalId);
        scrollIntervalId = null;
    }
    
    // Stop timers
    pausePulpitTimer();
}

function adjustPulpitFontSize(delta) {
    activeFontSize = Math.min(52, Math.max(20, activeFontSize + delta));
    elements.pulpitContent.style.fontSize = `${activeFontSize}px`;
    elements.fontSizeVal.textContent = `${activeFontSize}px`;
}

// RequestAnimationFrame Auto Scroll Engine
function toggleAutoScroll() {
    if (currentSpeed > 0) {
        if (!scrollIntervalId) {
            lastScrollTime = performance.now();
            scrollIntervalId = requestAnimationFrame(autoScrollLoop);
        }
    } else {
        if (scrollIntervalId) {
            cancelAnimationFrame(scrollIntervalId);
            scrollIntervalId = null;
        }
    }
}

function autoScrollLoop(timestamp) {
    if (currentSpeed === 0) {
        scrollIntervalId = null;
        return;
    }
    
    const elapsed = timestamp - lastScrollTime;
    
    // Conversion mapping for smooth pixel pacing
    const speeds = { 0: 0, 1: 0.02, 2: 0.05, 3: 0.12 };
    const pxPerMs = speeds[currentSpeed] || 0;
    
    if (pxPerMs > 0 && elapsed > 0) {
        elements.pulpitScrollContainer.scrollTop += pxPerMs * elapsed;
    }
    
    lastScrollTime = timestamp;
    scrollIntervalId = requestAnimationFrame(autoScrollLoop);
}

// Countdown timer functions
function togglePulpitTimer() {
    if (isTimerRunning) {
        pausePulpitTimer();
    } else {
        startPulpitTimer();
    }
}

function startPulpitTimer() {
    isTimerRunning = true;
    elements.pulpitTimerPlayBtn.textContent = "⏸";
    
    timerInterval = setInterval(() => {
        if (secondsRemaining > 0) {
            secondsRemaining--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            isTimerRunning = false;
            elements.pulpitTimerPlayBtn.textContent = "▶";
            showToast("Tempo esgotado da célula! ⏰", "error");
        }
    }, 1000);
}

function pausePulpitTimer() {
    isTimerRunning = false;
    elements.pulpitTimerPlayBtn.textContent = "▶";
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetPulpitTimer() {
    pausePulpitTimer();
    secondsRemaining = pulpitConfiguredTimeSeconds;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;
    
    elements.pulpitTimer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    // Alert threshold visual transition (under 2 minutes = glow red warning alert)
    if (secondsRemaining <= 120) {
        elements.pulpitTimer.classList.add('warning');
    } else {
        elements.pulpitTimer.classList.remove('warning');
    }
}

// --- Visual feedback notifications (Snackbar / Toast) ---
function showToast(message, type = "info") {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    elements.toastContainer.appendChild(toast);
    
    // Fade out occurs after 4s via CSS keyframes, let's remove from DOM at 4.2s
    setTimeout(() => {
        toast.remove();
    }, 4200);
}

// ==========================================================================
// MENTORIA HISTÓRICA LOGIC
// ==========================================================================

function renderMentorshipHub() {
    if (selectedMentorId === null) {
        elements.mentoriaHub.classList.remove('hidden');
        elements.mentoriaChat.classList.add('hidden');
    } else {
        elements.mentoriaHub.classList.add('hidden');
        elements.mentoriaChat.classList.remove('hidden');
    }
}

function selectMentor(mentorId) {
    selectedMentorId = mentorId;
    
    const mentorDetails = {
        lewis: {
            name: "C.S. Lewis",
            alcunha: "O Apologista Imaginativo",
            avatar: "CS"
        },
        spurgeon: {
            name: "Charles Spurgeon",
            alcunha: "O Príncipe dos Pregadores",
            avatar: "SP"
        },
        bonhoeffer: {
            name: "Dietrich Bonhoeffer",
            alcunha: "O Líder Radical",
            avatar: "DB"
        }
    };
    
    const details = mentorDetails[mentorId];
    elements.activeMentorName.textContent = details.name;
    elements.activeMentorAlcunha.textContent = details.alcunha;
    elements.activeMentorAvatar.textContent = details.avatar;
    
    // Reset inputs
    elements.mentoriaInput.value = "";
    elements.mentoriaInput.placeholder = `Pergunte algo para ${details.name}...`;
    
    renderMentorshipChatHistory();
    renderMentorshipHub();
}

function backToMentors() {
    selectedMentorId = null;
    renderMentorshipHub();
}

function renderMentorshipChatHistory() {
    const history = mentoriaConversations[selectedMentorId] || [];
    elements.mentoriaConversationLog.innerHTML = "";
    
    if (history.length === 0) {
        elements.mentoriaEmptyState.classList.remove('hidden');
    } else {
        elements.mentoriaEmptyState.classList.add('hidden');
        
        history.forEach(msg => {
            const bubble = document.createElement('div');
            bubble.className = `chat-message-bubble ${msg.sender}`;
            bubble.textContent = msg.text;
            elements.mentoriaConversationLog.appendChild(bubble);
        });
    }
    
    elements.mentoriaChatScroll.scrollTop = elements.mentoriaChatScroll.scrollHeight;
}

async function fetchGroqMentorResponse(mentor, question) {
    const mentorPrompts = {
        'C.S. Lewis': `Você é o teólogo e escritor apologista C.S. Lewis. Responda a dúvida do usuário no meu estilo de escrita típico, que é caracterizado por analogias profundas e brilhantes, uso de lógica racional apurada combinada com imaginação vívida e tom de conversa amigável, britânico e intelectualmente desafiador. Escreva uma resposta curta e teologicamente rica (máximo 3 parágrafos) sem sair do personagem, focando em orientar o líder de jovens ou adolescentes que lhe perguntou.`,
        'Charles Spurgeon': `Você é o pregador batista reformado Charles Spurgeon, conhecido como o "Príncipe dos Pregadores". Responda a dúvida teológica no meu estilo clássico de escrita: de forma eloquente, com paixão pastoral intensa, repleto de referências bíblicas, graciosidade e convicção sobre a obra da cruz. Use um tom paternal, caloroso e encorajador (máximo 3 parágrafos). Não saia do personagem.`,
        'Dietrich Bonhoeffer': `Você é o pastor, teólogo luterano e mártir alemão Dietrich Bonhoeffer. Responda no meu estilo clássico de escrita: direto, desafiador, focado no discipulado radical, no custo do seguimento de Cristo e na importância da comunidade de fé em oposição à graça barata do mundo secular moderno (máximo 3 parágrafos). Não saia do personagem.`
    };
    
    const systemPrompt = mentorPrompts[mentor] || `Você é um mentor teológico histórico. Responda com profundidade pastoral.`;
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${config.groqKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: question }
            ],
            temperature: 0.7,
            max_tokens: 600
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `Erro HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

async function submitMentorQuestion(e) {
    e.preventDefault();
    if (!selectedMentorId) return;
    
    const question = elements.mentoriaInput.value.trim();
    if (!question) return;
    
    elements.mentoriaInput.value = "";
    
    // Add user message
    mentoriaConversations[selectedMentorId].push({
        sender: 'user',
        text: question
    });
    renderMentorshipChatHistory();
    
    // Check credits
    const creditsLeft = supabaseClient && userProfile ? userProfile.creditos : simulatedCredits;
    if (creditsLeft <= 0) {
        showToast("Raios zerados! Carregue mais créditos para consultar o mentor.", "error");
        mentoriaConversations[selectedMentorId].push({
            sender: 'mentor',
            text: "⚠️ Energia insuficiente para consulta teológica. Adquira mais no painel."
        });
        renderMentorshipChatHistory();
        return;
    }
    
    // Show Loading
    elements.mentorLoading.classList.remove('hidden');
    elements.mentoriaChatScroll.scrollTop = elements.mentoriaChatScroll.scrollHeight;
    
    const mentorName = selectedMentorId === 'lewis' ? 'C.S. Lewis' : selectedMentorId === 'spurgeon' ? 'Charles Spurgeon' : 'Dietrich Bonhoeffer';
    
    try {
        // Deduct credit
        const success = await deductCredit();
        if (!success) throw new Error("Erro de processamento de créditos.");
        
        let answer = "";
        if (config.supabaseUrl && supabaseClient && userProfile) {
            // Sincroniza via Edge Function real
            const edgeUrl = `${config.supabaseUrl}/functions/v1/pregador-core`;
            let token = '';
            if (supabaseClient.auth.session) {
                token = supabaseClient.auth.session()?.access_token || '';
            } else if (supabaseClient.auth.getSession) {
                const { data } = await supabaseClient.auth.getSession();
                token = data?.session?.access_token || '';
            }
            if (!token) token = localStorage.getItem('supabase_token') || '';
            
            const response = await fetch(edgeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    acao: 'MENTORIA_HISTORICA',
                    payload: {
                        mentor: mentorName,
                        pergunta: question
                    }
                })
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            answer = data.resultado;
        } else if (config.groqKey) {
            // Consulta a API do Groq diretamente com o prompt de Mentor
            answer = await fetchGroqMentorResponse(mentorName, question);
        } else {
            // Fallback para simulador teológico offline
            answer = await simulateMentorResponse(mentorName, question);
        }
        
        mentoriaConversations[selectedMentorId].push({
            sender: 'mentor',
            text: answer
        });
        
    } catch (err) {
        console.error(err);
        // Fallback local caso dê erro de API
        const fallback = await simulateMentorResponse(mentorName, question);
        mentoriaConversations[selectedMentorId].push({
            sender: 'mentor',
            text: fallback
        });
    } finally {
        elements.mentorLoading.classList.add('hidden');
        renderMentorshipChatHistory();
    }
}

function simulateMentorResponse(mentor, question) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const q = question.toLowerCase();
            let res = "";
            
            if (mentor === 'C.S. Lewis') {
                if (q.includes('ansiedade') || q.includes('pressão') || q.includes('triste')) {
                    res = "Meu caro líder, a ansiedade moderna é o resultado inevitável de estarmos hiper-conectados ao barulho da nossa própria imagem digital. Procuramos nas telas a aprovação que só o Criador pode dar. Lembre a seus adolescentes que as redes sociais vendem um 'eu idealizado' que não existe. A verdade de Cristo nos resgata do abismo das falsas expectativas, restaurando o nosso espírito na realidade graciosa e silenciosa de Deus. Não corra atrás de sombras, habite na substância.";
                } else if (q.includes('engajar') || q.includes('chato') || q.includes('interess')) {
                    res = "Para falar à imaginação dos adolescentes, precisamos primeiro falar a verdade de forma intelectual e poética. Se a pregação parece um conjunto de regras frias, você falhou em transmitir o romance da fé. O evangelho é uma aventura que resgata a humanidade decaída. Use metáforas literárias, conte histórias verdadeiras que capturem as dores existenciais deles. Mostre que o ceticismo não é o fim, mas sim o início de uma investigação sincera sobre o sentido do universo.";
                } else {
                    res = "Entendo a sua inquietação de líder. A dor do ceticismo e a falta de propósito da juventude atual são apenas o desejo profundo de um lar espiritual que o mundo não pode preencher. Apresente-lhes um Deus que é bom, mas que não é domesticado. Desafie o intelecto deles com apologética viva, focando em responder as dúvidas honestas que eles têm no offline. O silêncio e a imaginação são ferramentas poderosas na era do barulho.";
                }
            } else if (mentor === 'Charles Spurgeon') {
                if (q.includes('burnout') || q.includes('cansado') || q.includes('desistir')) {
                    res = "Meu amado irmão de ministério, sei exatamente o peso que você carrega. O burnout pastoral e a exaustão emocional também me visitaram muitas vezes. O nosso coração é frágil e a mente falha. Lembre-se: o sucesso do culto não repousa na sua oratória ou nas suas luzes, mas na graça divina. Descanse nos pastos do Senhor. Quando o pastor se esgota, a igreja perde o fôlego da vida. Ame os jovens, mas saiba desligar o seu próprio painel para deixar o Espírito preencher o seu vaso.";
                } else if (q.includes('ansiedade') || q.includes('pressão')) {
                    res = "A ansiedade e a dor da comparação são venenos sutis que assolam nossa mente. Diante do púlpito ou no banco, os jovens sofrem. Diga a eles que a graça de Deus é maior que qualquer falha, e que a aprovação do Pai já foi conquistada na cruz. Pregue sobre o amor restaurador com paixão pastoral intensa. O evangelho não é sobre estarmos imunes à dor, mas sobre termos um Salvador que segura a nossa mão na tempestade.";
                } else {
                    res = "Para pregar com eficácia na era digital, você deve pregar com profundidade doutrinária e com amor fervente. Não se perca na busca por gírias passageiras ou entretenimento raso. O coração humano deseja a graça, a verdade eterna que liberta. Alimente suas ovelhas com a Palavra. Tenha coragem de subir ao palco com humildade e convicção, sabendo que a glória pertence somente a Jesus.";
                }
            } else { // Bonhoeffer
                if (q.includes('radical') || q.includes('santidade') || q.includes('mundo')) {
                    res = "O discipulado tem um custo, meu jovem líder. Em uma sociedade hiper-estimulada e secularizada, falar sobre santidade exige coragem moral. Não venda uma graça barata que perdoa sem exigir transformação. Chame os jovens para a renúncia. Quando Cristo chama um homem, ele o convida a vir e morrer para o seu próprio eu virtual. A vida em comunidade real, onde dividimos o pão e confessamos fraquezas face a face, é o único antídoto contra a hipocrisia e a solidão digital.";
                } else if (q.includes('comunidade') || q.includes('juntos') || q.includes('célula')) {
                    res = "A verdadeira comunidade cristã não é um clube de curtidas virtuais, mas sim o corpo físico onde vivemos o discipulado duro e a coragem de amar o próximo. Adolescentes precisam de relacionamentos no offline que sobrevivam às falhas e imperfeições. Promova o acolhimento sincero, incentive-os a deixar os celulares de lado durante a comunhão e a assumir responsabilidades reais uns pelos outros.";
                } else {
                    res = "O custo de seguir a Cristo em um mundo dominado por feeds é alto. O jovem é cobrado a seguir o molde da cultura secular. Como líderes, devemos capacitá-los a viver com integridade moral e coragem. Não se preocupe em lotar eventos se o preço for a superficialidade da mensagem. Um único discípulo firmado na verdade vale mais do que cem ouvintes casuais. Desafie-os ao compromisso prático com os necessitados e marginalizados.";
                }
            }
            
            showToast(`Resposta recebida de ${mentor}! 📜`, "success");
            resolve(res);
        }, 1500);
    });
}

// ==========================================================================
// BÍBLIA NATIVA LOGIC
// ==========================================================================

const MOCK_BIBLE_VERSES = {
    "Mateus": {
        "1": [
            { num: 1, text: "Livro da geração de Jesus Cristo, filho de Davi, filho de Abraão." },
            { num: 18, text: "Ora, o nascimento de Jesus Cristo foi assim: Estando Maria, sua mãe, desposada com José, antes de se ajuntarem, achou-se ter concebido do Espírito Santo." },
            { num: 21, text: "E dará à luz um filho e chamarás o seu nome JESUS; porque ele salvará o seu povo dos seus pecados." }
        ]
    },
    "Mateus": {
        "5": [
            { num: 3, text: "Bem-aventurados os pobres de espírito, porque deles é o reino dos céus;" },
            { num: 14, text: "Vós sois a luz do mundo; não se pode esconder uma cidade edificada sobre um monte;" },
            { num: 16, text: "Assim resplandeça a vossa luz diante dos homens, para que vejam as vossas boas obras e glorifiquem a vosso Pai, que está nos céus." }
        ]
    },
    "João": {
        "1": [
            { num: 1, text: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus." },
            { num: 2, text: "Ele estava no princípio com Deus." },
            { num: 3, text: "Todas as coisas foram feitas por ele, e sem ele nada do que foi feito se fez." },
            { num: 4, text: "Nele estava a vida, e a vida era a luz dos homens." },
            { num: 5, text: "E a luz resplandece nas trevas, e as trevas não a compreenderam." },
            { num: 12, text: "Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, aos que creem no seu nome;" },
            { num: 14, text: "E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória, como a glória do unigênito do Pai, cheio de graça e de verdade." }
        ],
        "3": [
            { num: 16, text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna." },
            { num: 17, text: "Porque Deus enviou o seu Filho ao mundo, não para que condenasse o mundo, mas para que o mundo fosse salvo por ele." }
        ]
    },
    "Filipenses": {
        "4": [
            { num: 6, text: "Não andeis ansiosos por coisa alguma; antes em tudo as vossas petições sejam conhecidas diante de Deus pela oração e súplica, com ação de graças." },
            { num: 7, text: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus." },
            { num: 13, text: "Posso todas as coisas naquele que me fortalece." }
        ]
    },
    "Romanos": {
        "12": [
            { num: 1, text: "Rogo-vos, pois, irmãos, pela compaixão de Deus, que apresenteis os vossos corpos em sacrifício vivo, santo e agradável a Deus, que é o vosso culto racional." },
            { num: 2, text: "E não sede conformados com este mundo, mas sede transformados pela renovação da vossa mente, para que experimenteis qual seja a boa, agradável, e perfeita vontade de Deus." }
        ]
    }
};

function loadBibleVerseList() {
    const book = elements.bibleBookSelect.value;
    const chapter = elements.bibleChapterSelect.value;
    
    elements.bibleChapterTitle.textContent = `${book} ${chapter}`;
    elements.bibleVersesList.innerHTML = "";
    elements.bibleFloatingMenu.classList.add('hidden');
    selectedBibleVerseId = null;
    
    // Check local mock DB
    let verses = [];
    if (MOCK_BIBLE_VERSES[book] && MOCK_BIBLE_VERSES[book][chapter]) {
        verses = MOCK_BIBLE_VERSES[book][chapter];
    } else {
        // Fallback generator for other combinations
        verses = [
            { num: 1, text: `Passagem demonstrativa de ${book} capítulo ${chapter}, versículo 1.` },
            { num: 2, text: `E disse o Senhor: Guardai os vossos caminhos e buscai a sabedoria eternal.` },
            { num: 3, text: `Aquele que perseverar herdará a coroa da vida e brilhará como as estrelas no firmamento.` }
        ];
    }
    
    verses.forEach(v => {
        const row = document.createElement('div');
        const ref = `${book} ${chapter}:${v.num}`;
        
        row.className = "bible-verse-row";
        if (bibleHighlights[ref]) {
            row.classList.add(`highlight-${bibleHighlights[ref]}`);
        }
        
        row.dataset.verseNum = v.num;
        row.dataset.verseText = v.text;
        row.dataset.verseRef = ref;
        
        row.innerHTML = `
            <span class="bible-verse-num">${v.num}</span>
            <span class="verse-text-body">${v.text}</span>
        `;
        
        row.addEventListener('click', (e) => onVerseClick(e, row));
        elements.bibleVersesList.appendChild(row);
    });
}

function onVerseClick(e, row) {
    e.stopPropagation();
    
    const rows = elements.bibleVersesList.querySelectorAll('.bible-verse-row');
    rows.forEach(r => r.classList.remove('selected-verse'));
    
    row.classList.add('selected-verse');
    selectedBibleVerseId = row.dataset.verseNum;
    selectedBibleText = row.dataset.verseText;
    selectedBibleRef = row.dataset.verseRef;
    
    // Position floating context bar above clicked element
    const rect = row.getBoundingClientRect();
    const scrollContainer = elements.paneBiblia.getBoundingClientRect();
    
    // Calculate page offsets
    const menu = elements.bibleFloatingMenu;
    menu.classList.remove('hidden');
    
    const left = rect.left + rect.width / 2;
    const top = rect.top + window.scrollY;
    
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
}

// Hide floating menu on click outside
document.addEventListener('click', (e) => {
    if (elements.bibleFloatingMenu && !elements.bibleFloatingMenu.contains(e.target)) {
        elements.bibleFloatingMenu.classList.add('hidden');
    }
});

function applyHighlight(color) {
    if (!selectedBibleRef) {
        showToast("Selecione um versículo primeiro!", "warning");
        return;
    }
    
    // Find row in DOM
    const row = elements.bibleVersesList.querySelector(`.bible-verse-row[data-verse-ref="${selectedBibleRef}"]`);
    if (!row) return;
    
    // Remove previous highlight colors
    row.classList.remove('highlight-green', 'highlight-blue', 'highlight-yellow', 'highlight-pink');
    
    if (color === 'clear') {
        delete bibleHighlights[selectedBibleRef];
        showToast("Destaque removido!", "success");
    } else {
        row.classList.add(`highlight-${color}`);
        bibleHighlights[selectedBibleRef] = color;
        showToast("Versículo destacado!", "success");
    }
    
    localStorage.setItem('app_pregador_bible_highlights', JSON.stringify(bibleHighlights));
}

function copySelectedVerse() {
    if (!selectedBibleRef || !selectedBibleText) {
        showToast("Selecione um versículo primeiro!", "warning");
        return;
    }
    const textToCopy = `"${selectedBibleText}" (${selectedBibleRef})`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("Versículo copiado! 📋", "success");
    }).catch(err => {
        console.error(err);
        showToast("Erro ao copiar versículo.", "error");
    });
}

function shareSelectedVerse() {
    if (!selectedBibleRef || !selectedBibleText) {
        showToast("Selecione um versículo primeiro!", "warning");
        return;
    }
    const shareText = `*Lente Bíblica appPregador 2.0* ⚡\n\n"${selectedBibleText}"\n(_${selectedBibleRef}_)`;
    
    if (navigator.share) {
        navigator.share({
            title: 'appPregador 2.0',
            text: shareText
        }).catch(err => {
            console.log("Compartilhamento cancelado ou falhou", err);
        });
    } else {
        // Fallback to copying share link/text
        navigator.clipboard.writeText(shareText).then(() => {
            showToast("Mensagem de compartilhamento copiada! Envie no WhatsApp ou redes 📲", "success");
        }).catch(() => {
            showToast("Erro ao compartilhar.", "error");
        });
    }
}

async function fetchDirectGroqBibleChat(systemPrompt, history) {
    const messages = [{ role: 'system', content: systemPrompt }, ...history];
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${config.groqKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: messages,
            temperature: 0.7,
            max_tokens: 1200
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `Erro HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

function renderBibleChatHistory() {
    elements.bibleChatHistory.innerHTML = "";
    
    bibleChatSession.messages.forEach((msg, index) => {
        // Skip the very first user message which is just the verse reference context setup
        if (index === 0 && msg.role === 'user') return;
        
        const bubble = document.createElement('div');
        bubble.className = `bible-chat-bubble ${msg.role === 'assistant' ? 'ai' : 'user'}`;
        
        const author = msg.role === 'assistant' ? 'Teólogo IA' : 'Você';
        bubble.innerHTML = `
            <div class="bubble-meta">${author}</div>
            <div class="bubble-text">${marked.parse(msg.content)}</div>
        `;
        
        elements.bibleChatHistory.appendChild(bubble);
    });
    
    // Scroll to bottom
    elements.bibleActionModal.querySelector('.bible-panel-body').scrollTop = 
        elements.bibleActionModal.querySelector('.bible-panel-body').scrollHeight;
}

async function submitBibleChatRefine() {
    const text = elements.bibleChatInput.value.trim();
    if (!text) return;
    
    elements.bibleChatInput.value = "";
    
    // Append user message
    bibleChatSession.messages.push({ role: 'user', content: text });
    renderBibleChatHistory();
    
    // Append loading bubble
    const loadingBubble = document.createElement('div');
    loadingBubble.className = "bible-chat-bubble ai";
    loadingBubble.id = "bibleActionRefineLoading";
    loadingBubble.innerHTML = `
        <div class="bubble-meta">Teólogo IA</div>
        <div class="bubble-text">
            <span class="spinner">⏳</span> Analisando seu feedback...
        </div>
    `;
    elements.bibleChatHistory.appendChild(loadingBubble);
    
    // Scroll to bottom
    elements.bibleActionModal.querySelector('.bible-panel-body').scrollTop = 
        elements.bibleActionModal.querySelector('.bible-panel-body').scrollHeight;
        
    // Check credits
    const creditsLeft = supabaseClient && userProfile ? userProfile.creditos : simulatedCredits;
    if (creditsLeft <= 0) {
        showToast("Raios esgotados!", "error");
        loadingBubble.innerHTML = `⚠️ Raios insuficientes para processamento de IA. Por favor, resete ou adquira mais no painel.`;
        return;
    }
    
    try {
        const success = await deductCredit();
        if (!success) throw new Error("Erro de processamento de créditos.");
        
        let promptResult = "";
        
        const systemPrompt = bibleChatSession.actionType === 'quebra-gelo' 
            ? `Você é um líder de jovens super criativo e teologicamente sólido. Crie dinâmicas de quebra-gelo (células) baseadas no versículo. Linguagem moderna Gen Z/Alpha, mas natural, autêntica e sem forçar gírias excessivas.`
            : `Você é um tradutor especialista em linguagem da Geração Z e Alpha, explicando de forma autêntica e natural o versículo, usando analogias do cotidiano digital de forma orgânica, sem parecer forçado.`;
            
        if (config.supabaseUrl && supabaseClient && userProfile) {
            const edgeUrl = `${config.supabaseUrl}/functions/v1/pregador-core`;
            let token = '';
            if (supabaseClient.auth.session) {
                token = supabaseClient.auth.session()?.access_token || '';
            } else if (supabaseClient.auth.getSession) {
                const { data } = await supabaseClient.auth.getSession();
                token = data?.session?.access_token || '';
            }
            if (!token) token = localStorage.getItem('supabase_token') || '';
            
            const response = await fetch(edgeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    acao: 'BIBLE_CHAT_REFINE',
                    payload: {
                        systemPrompt: systemPrompt,
                        historico: bibleChatSession.messages
                    }
                })
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            promptResult = data.resultado;
        } else if (config.groqKey) {
            promptResult = await fetchDirectGroqBibleChat(systemPrompt, bibleChatSession.messages);
        } else {
            promptResult = `[Modo Simulação] Entendi sua solicitação sobre "${text}". Aqui está um detalhamento com linguagem Gen Z natural: "É basicamente o que explicamos antes, mas focado na consistência do seu testemunho digital. Sem lag mental."`;
        }
        
        // Remove loading bubble
        loadingBubble.remove();
        
        // Save assistant response
        bibleChatSession.messages.push({ role: 'assistant', content: promptResult });
        renderBibleChatHistory();
        
    } catch (e) {
        console.error(e);
        loadingBubble.innerHTML = `⚠️ Ocorreu um erro ao processar sua solicitação: ${e.message}`;
    }
}

async function triggerBibleAction(actionType) {
    if (!selectedBibleVerseId) return;
    
    elements.bibleFloatingMenu.classList.add('hidden');
    
    // Set titles
    const panelTitle = actionType === 'quebra-gelo' ? "🎲 Quebra-Gelo Gerado" : "💡 Tradução Gen Z / Alpha";
    elements.bibleModalTitle.textContent = panelTitle;
    elements.bibleModalVerseRef.innerHTML = `<strong>${selectedBibleRef}</strong> - "${selectedBibleText}"`;
    
    // Initialize session
    bibleChatSession.actionType = actionType;
    bibleChatSession.verseRef = selectedBibleRef;
    bibleChatSession.verseText = selectedBibleText;
    bibleChatSession.messages = [];
    
    // Show Modal (Full-screen panel)
    elements.bibleActionModal.classList.remove('hidden');
    
    // Clear chat input & history
    elements.bibleChatInput.value = "";
    elements.bibleChatHistory.innerHTML = `
        <div class="bible-chat-bubble ai" id="bibleActionLoadingBubble">
            <div class="bubble-meta">Teólogo IA</div>
            <div class="bubble-text">
                <span class="spinner">⏳</span> Processando sabedoria teológica para jovens...
            </div>
        </div>
    `;
    
    // Check credits
    const creditsLeft = supabaseClient && userProfile ? userProfile.creditos : simulatedCredits;
    if (creditsLeft <= 0) {
        showToast("Raios esgotados!", "error");
        const loading = document.getElementById('bibleActionLoadingBubble');
        if (loading) loading.innerHTML = `⚠️ Raios insuficientes para processamento de IA. Por favor, resete ou adquira mais no painel.`;
        return;
    }
    
    try {
        const success = await deductCredit();
        if (!success) throw new Error("Erro de processamento de créditos.");
        
        let promptResult = "";
        
        const systemPrompt = actionType === 'quebra-gelo' 
            ? `Você é um líder de jovens super criativo e teologicamente sólido. Crie dinâmicas de quebra-gelo (células) baseadas no versículo. Linguagem moderna Gen Z/Alpha, mas natural, autêntica e sem forçar gírias excessivas.`
            : `Você é um tradutor especialista em linguagem da Geração Z e Alpha, explicando de forma autêntica e natural o versículo, usando analogias do cotidiano digital de forma orgânica, sem parecer forçado.`;
        
        const userPrompt = `Versículo: ${selectedBibleRef} -> "${selectedBibleText}"`;
        
        if (config.supabaseUrl && supabaseClient && userProfile) {
            const edgeUrl = `${config.supabaseUrl}/functions/v1/pregador-core`;
            let token = '';
            if (supabaseClient.auth.session) {
                token = supabaseClient.auth.session()?.access_token || '';
            } else if (supabaseClient.auth.getSession) {
                const { data } = await supabaseClient.auth.getSession();
                token = data?.session?.access_token || '';
            }
            if (!token) token = localStorage.getItem('supabase_token') || '';
            
            const response = await fetch(edgeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    acao: 'BIBLE_CHAT_REFINE',
                    payload: {
                        systemPrompt: systemPrompt,
                        historico: [{ role: 'user', content: userPrompt }]
                    }
                })
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            promptResult = data.resultado;
        } else if (config.groqKey) {
            promptResult = await fetchDirectGroqBibleChat(systemPrompt, [{ role: 'user', content: userPrompt }]);
        } else {
            promptResult = await simulateBibleAction(actionType, selectedBibleRef, selectedBibleText);
        }
        
        bibleChatSession.messages.push({ role: 'user', content: userPrompt });
        bibleChatSession.messages.push({ role: 'assistant', content: promptResult });
        
        renderBibleChatHistory();
        showToast("Sucesso no Processamento de Lente Bíblica! ⚡", "success");
    } catch (err) {
        console.error(err);
        const fallback = await simulateBibleAction(actionType, selectedBibleRef, selectedBibleText);
        bibleChatSession.messages.push({ role: 'user', content: `Versículo: ${selectedBibleRef}` });
        bibleChatSession.messages.push({ role: 'assistant', content: fallback });
        renderBibleChatHistory();
    }
}

function simulateBibleAction(actionType, verseRef, verseText) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let md = "";
            if (actionType === 'quebra-gelo') {
                md = `### 🎲 Dinâmica de Célula: "Reset de Cache"
**Conexão Temática com ${verseRef}**

*   **Objetivo:** Mostrar como acumulamos sentimentos desnecessários (dados temporários de navegação) na mente e como precisamos esvaziar a mente para receber o novo de Deus.
*   **Materiais:** Copos descartáveis vazios e pequenas bolinhas de papel ou botões.
*   **Como Executar (3 etapas):**
    1.  **Enchimento:** Peça para cada jovem listar frustrações da semana (comparação, notas baixas, feed estressante). A cada dor, eles colocam uma bolinha de papel no copo.
    2.  **O Bug:** Quando o copo estiver cheio, desafie-os a equilibrar mais coisas por cima. Eles vão ver que o copo transborda ou cai (o sistema 'crasha').
    3.  **O Reset:** Leiam ${verseRef} juntos. Peça para todos virarem o copo de cabeça para baixo no centro do círculo, declarando que estão limpando o firmware mental para a vontade do Pai.
*   **Pergunta Gancho para Debater:** "Qual o maior 'arquivo temporário' de ansiedade que você precisa desinstalar do seu coração hoje?"`;
            } else {
                md = `### 💡 Tradução Simplificada (Lente Gen Z / Alpha)
**Descodificando ${verseRef}**

*   **Texto Original:** *"${verseText}"*
*   **Tradução para o Feed:** "Não deixe a cultura do algoritmo mundial empacotar a sua mente nos layouts prontos deles. Faça uma atualização de firmware completa (*metanoia*) com o Espírito Santo para testar o código original que é perfeito, bom e faz sentido real para sua vida."
*   **O Gancho Analógico:** É como usar um template pronto do PowerPoint que todo mundo já viu. Paulo diz para você criar o seu próprio design personalizado baseado nas especificações originais do Criador, e não viver copiando a 'skin' dos influenciadores do mundo.`;
            }
            resolve(md);
        }, 1500);
    });
}

// ==========================================================================
// ACADEMIA DE LÍDERES RPG GAMIFIED
// ==========================================================================

const LESSON_ARTICLES = {
    1: {
        title: "Lição 1.1: Ansiedade & Dopamina nas Redes",
        text: `<h3>📱 O Sistema de Dopamina Gen Z</h3>
        <p>A Geração Z e Alpha são bombardeadas por micro-vídeos (TikTok, Reels, Shorts) que induzem disparos rápidos de dopamina no cérebro. Esse fluxo de recompensas instantâneas treinou a mente jovem a perder o foco em discursos lineares longos.</p>
        <blockquote>"Não vos conformeis com este mundo, mas transformai-vos pela renovação da vossa mente..." (Romanos 12:2)</blockquote>
        <p><strong>A Regra de Palco:</strong> Ao pregar para adolescentes, você não pode começar com um sermão teológico complexo de 40 minutos sem ganchos. Você precisa reter a atenção deles nos primeiros 3 segundos (Gancho Cultural) e então aprofundar na mensagem de Cristo de forma prática e objetiva.</p>`
    },
    2: {
        title: "Lição 1.2: Glitches de Identidade Digital",
        text: `<h3>🧬 As Skins do Avatar Digital</h3>
        <p>Adolescentes costumam usar avatares e 'skins' virtuais para fingirem ser perfeitos, escondendo inseguranças e vulnerabilidades. Isso gera crises de autoimagem e solidão offline.</p>
        <blockquote>"Antes que te formasse no ventre te conheci..." (Jeremias 1:5)</blockquote>
        <p><strong>A Aplicação Prática:</strong> Ensine a seus liderados que o valor deles não depende de curtidas ou comentários. Use dinâmicas de conexão offline na sua célula para quebrar as barreiras e permitir conversas vulneráveis onde eles possam tirar a máscara digital e serem aceitos de verdade.</p>`
    },
    3: {
        title: "Lição 2.1: Postura Sem Ruídos Físicos",
        text: `<h3>🗣️ Linguagem Corporal no Púlpito</h3>
        <p>A oratória não se resume às palavras faladas. Mais de 50% da retenção visual vem da postura corporal do comunicador. Ruídos de palco, como andar em zigue-zague ou gesticular sem controle, desviam o foco da mensagem.</p>
        <p><strong>Dicas de Ouro:</strong>
        1. Fixe seus pés firme no solo em posição aberta e confortável.
        2. Mantenha os braços acima da linha da cintura e use gestos amplos e abertos para convites ou explicações.
        3. Olhe nos olhos das pessoas nas diferentes seções do templo ou sala, criando conexão individual.</p>`
    },
    4: {
        title: "Lição 2.2: O Tom da Graça no Púlpito",
        text: `<h3>🎵 Vulnerabilidade e Ritmo Vocal</h3>
        <p>O tom de voz dita a atmosfera. Pregações que soam como palestras acadêmicas ou discursos rígidos não geram conversão na juventude hyper-conectada, que valoriza a autenticidade acima de tudo.</p>
        <p><strong>A Estratégia de Ritmo:</strong> Use o silêncio estratégico após perguntas difíceis. Fale de seus próprios erros. Compartilhar suas próprias fraquezas e dependência da graça no palco cria um elo de conexão inestimável e aproxima os jovens da verdade.</p>`
    },
    5: {
        title: "Lição 3.1: Quebrando Gelos de Aço",
        text: `<h3>🧩 Dinâmicas de Alto Impacto</h3>
        <p>Quebra-gelos não são brincadeiras infantis, mas sim ferramentas científicas de neuro-associação para relaxar o córtex pré-frontal e preparar o jovem calado para a partilha espiritual.</p>
        <p><strong>Como usar:</strong> Sempre escolha dinâmicas que coloquem os jovens em movimento físico leve (como levantar e trocar de cadeira) ou risadas coletivas. Isso libera endorfina e oxitocina, gerando confiança instantânea para debates de assuntos profundos.</p>`
    }
};

function renderAcademyProgress() {
    // Sync header XP & Level bar values
    elements.userLevelVal.textContent = leaderLevel;
    elements.userXpVal.textContent = `${leaderXp} / 500 XP`;
    const pct = Math.min(100, (leaderXp / 500) * 100);
    elements.xpProgressBar.style.width = `${pct}%`;
    
    // Sync academy panel progress values
    elements.academyLevelVal.textContent = leaderLevel;
    elements.academyXpVal.textContent = `${leaderXp} / 500 XP`;
    elements.academyXpBar.style.width = `${pct}%`;
    
    const mobileLevel = document.getElementById('mobileLevelVal');
    if (mobileLevel) {
        mobileLevel.textContent = leaderLevel;
    }
    
    // Render Timeline cards states
    const cards = elements.paneAcademia.querySelectorAll('.lesson-card');
    cards.forEach(card => {
        const id = parseInt(card.dataset.lessonId, 10);
        
        card.classList.remove('completed', 'active', 'locked');
        const icon = card.querySelector('.lesson-status-icon');
        
        if (completedLessons.includes(id)) {
            card.classList.add('completed');
            icon.textContent = "✓";
        } else {
            // Check if predecessor is completed
            const isPrevCompleted = id === 1 || completedLessons.includes(id - 1);
            if (isPrevCompleted) {
                card.classList.add('active');
                icon.textContent = "▶";
            } else {
                card.classList.add('locked');
                icon.textContent = "🔒";
            }
        }
        
        // Remove old event listener and add fresh one
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        newCard.addEventListener('click', () => {
            if (newCard.classList.contains('locked')) {
                showToast("Esta lição está trancada! Conclua as lições anteriores.", "error");
                return;
            }
            openAcademyLesson(id);
        });
    });
}

function openAcademyLesson(lessonId) {
    const lesson = LESSON_ARTICLES[lessonId];
    if (!lesson) return;
    
    elements.lessonModalTitle.textContent = lesson.title;
    elements.lessonModalContent.innerHTML = lesson.text;
    elements.completeLessonBtn.dataset.lessonId = lessonId;
    
    // Toggle button state if already completed
    if (completedLessons.includes(lessonId)) {
        elements.completeLessonBtn.disabled = true;
        elements.completeLessonBtn.textContent = "Treinamento Concluído! ✓";
        elements.completeLessonBtn.classList.remove('btn-pulse');
    } else {
        elements.completeLessonBtn.disabled = false;
        elements.completeLessonBtn.textContent = "Concluir Treinamento 🎓";
        elements.completeLessonBtn.classList.add('btn-pulse');
    }
    
    elements.lessonReaderModal.classList.remove('hidden');
}

function completeAcademyLesson(lessonId) {
    if (completedLessons.includes(lessonId)) return;
    
    completedLessons.push(lessonId);
    elements.lessonReaderModal.classList.add('hidden');
    
    // Award 50 XP
    leaderXp += 50;
    showToast("+50 XP de Liderança adquiridos! 🎓🏆", "success");
    
    // Trigger confetti explosion
    triggerConfettiSparkles();
    
    // Check level progression
    checkLevelUp();
    
    // Save locally or sync to supabase in production
    saveGamificationState();
    
    renderAcademyProgress();
}

function checkLevelUp() {
    if (leaderXp >= 500) {
        leaderLevel += 1;
        leaderXp -= 500;
        
        // Award credits (Raios)
        if (supabaseClient && userProfile) {
            // Update Supabase Database
            const newCredits = userProfile.creditos + 5;
            supabaseClient
                .from('perfis_jovens')
                .update({ creditos: newCredits, nivel: leaderLevel, xp: leaderXp })
                .eq('id', userProfile.id)
                .then(({ error }) => {
                    if (!error) {
                        userProfile.creditos = newCredits;
                        userProfile.nivel = leaderLevel;
                        userProfile.xp = leaderXp;
                        updateCreditsUI();
                    }
                });
        } else {
            simulatedCredits += 5;
            updateCreditsUI();
        }
        
        setTimeout(() => {
            showToast(`🔥 LEVEL UP! Você subiu para o Nível ${leaderLevel} e ganhou +5 RAIOS de bônus! ⚡🔋`, "success");
            // double confetti
            triggerConfettiSparkles();
            setTimeout(triggerConfettiSparkles, 300);
        }, 800);
    }
}

function triggerConfettiSparkles() {
    const container = document.createElement('div');
    container.className = "confetti-container";
    document.body.appendChild(container);
    
    // Colors of neon theme
    const colors = ['#22C55E', '#06B6D4', '#7B2CBF', '#FF007F', '#FFFF00'];
    
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = "confetti-particle";
        
        // Random style setup
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = `${Math.random() * 100}vw`;
        p.style.width = `${4 + Math.random() * 8}px`;
        p.style.height = `${4 + Math.random() * 8}px`;
        
        // Random falling parameters
        p.style.animationDuration = `${1.5 + Math.random() * 2}s`;
        p.style.animationDelay = `${Math.random() * 0.5}s`;
        
        container.appendChild(p);
    }
    
    setTimeout(() => {
        container.remove();
    }, 4000);
}

function saveGamificationState() {
    localStorage.setItem('leader_xp', leaderXp);
    localStorage.setItem('leader_level', leaderLevel);
    localStorage.setItem('completed_lessons', JSON.stringify(completedLessons));
}

function loadGamificationState() {
    if (localStorage.getItem('leader_xp')) {
        leaderXp = parseInt(localStorage.getItem('leader_xp'), 10);
        leaderLevel = parseInt(localStorage.getItem('leader_level'), 10);
        completedLessons = JSON.parse(localStorage.getItem('completed_lessons'));
    }
    renderAcademyProgress();
}

// ==========================================================================
// TELEPROMPTER STAGE IMPROVEMENTS
// ==========================================================================

let pulpitWakeLock = null;

async function requestWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            pulpitWakeLock = await navigator.wakeLock.request('screen');
            console.log('Teleprompter WakeLock ativado.');
        }
    } catch (err) {
        console.warn(`Wakelock falhou: ${err.message}`);
    }
}

function releaseWakeLock() {
    if (pulpitWakeLock !== null) {
        pulpitWakeLock.release().then(() => {
            pulpitWakeLock = null;
            console.log('Teleprompter WakeLock liberado.');
        });
    }
}

function setupPulpitTouchZones() {
    if (!document.getElementById('pulpitZoneUp')) {
        const zoneUp = document.createElement('div');
        zoneUp.id = 'pulpitZoneUp';
        zoneUp.className = 'pulpit-scroll-zone zone-up';
        zoneUp.addEventListener('click', () => {
            elements.pulpitScrollContainer.scrollBy({ top: -200, behavior: 'smooth' });
        });
        elements.pulpitOverlay.appendChild(zoneUp);
    }
    
    if (!document.getElementById('pulpitZoneDown')) {
        const zoneDown = document.createElement('div');
        zoneDown.id = 'pulpitZoneDown';
        zoneDown.className = 'pulpit-scroll-zone zone-down';
        zoneDown.addEventListener('click', () => {
            elements.pulpitScrollContainer.scrollBy({ top: 200, behavior: 'smooth' });
        });
        elements.pulpitOverlay.appendChild(zoneDown);
    }
}

// Hook into openPulpitMode to activate WakeLock and scroll zones
const originalOpenPulpitMode = openPulpitMode;
openPulpitMode = function() {
    originalOpenPulpitMode();
    requestWakeLock();
    setupPulpitTouchZones();
};

// Hook into closePulpitMode to release WakeLock
const originalClosePulpitMode = closePulpitMode;
closePulpitMode = function() {
    originalClosePulpitMode();
    releaseWakeLock();
};

// Initial state loads
document.addEventListener('DOMContentLoaded', () => {
    loadGamificationState();
    window.selectMentor = selectMentor;
});

// ==========================================================================
// RECARGA DE CRÉDITOS (PAINEL FINANCEIRO) LOGIC
// ==========================================================================

function renderRechargePane() {
    const credits = supabaseClient && userProfile ? userProfile.creditos : simulatedCredits;
    elements.rechargeBalanceCount.textContent = credits;
    
    // Select package by default
    selectRechargePackage(selectedRechargePackage);
    selectPaymentMethod(selectedPaymentMethod);
}

function selectRechargePackage(packageId) {
    selectedRechargePackage = packageId;
    
    const qtyMap = {
        faisca: 30,
        premium_anual: 100,
        tempestade: 150
    };
    
    elements.submitQtyVal.textContent = qtyMap[packageId] || 100;
}

function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    elements.btnPayPix.classList.remove('active');
    elements.btnPayCard.classList.remove('active');
    
    if (method === 'pix') {
        elements.btnPayPix.classList.add('active');
    } else {
        elements.btnPayCard.classList.add('active');
    }
}

function handleRechargeCheckout() {
    if (!selectedRechargePackage) return;
    
    const packageDetails = {
        faisca: { name: "Pacote Faísca", price: "29,90" },
        premium_anual: { name: "Premium Anual", price: "197,00" },
        tempestade: { name: "Pacote Tempestade", price: "89,90" }
    };
    
    const details = packageDetails[selectedRechargePackage];
    
    showToast(`Redirecionando para o ambiente seguro de pagamento... ⚡`, "info");
    
    console.log(`Checkout Iniciado: ${details.name} (R$ ${details.price}) via ${selectedPaymentMethod.toUpperCase()}`);
    
    // Injetar o id do usuário do Supabase para que o Webhook possa identificar a quem adicionar os Raios
    const userId = userProfile ? userProfile.id : 'simulado_user_123';
    let checkoutUrl = `https://pay.kiwify.com.br/PaFqA0M?external_id=${userId}`;
    
    // Se o usuário estiver autenticado no Supabase, pegamos o e-mail cadastrado
    const session = supabaseClient?.auth?.session?.();
    const email = session?.user?.email || userProfile?.email;
    if (email) {
        checkoutUrl += `&email=${encodeURIComponent(email)}`;
    }
    
    setTimeout(() => {
        window.open(checkoutUrl, '_blank');
        showToast("Redirecionado para o checkout Kiwify! 🛒", "success");
    }, 1000);
}

async function submitOnboardingData() {
    if (supabaseClient && userProfile) {
        try {
            const { error } = await supabaseClient
                .from('perfis_jovens')
                .update({ 
                    aceitou_termos_lgpd: true,
                    data_consentimento: new Date().toISOString()
                })
                .eq('id', userProfile.id);
                
            if (error) throw error;
            
            userProfile.aceitou_termos_lgpd = true;
            showToast("Consentimento registrado! Acesso liberado. ⚡", "success");
        } catch (err) {
            console.error(err);
            showToast("Erro ao registrar consentimento no banco.", "error");
        }
    } else {
        showToast("Simulação: Acesso 2.0 ativado! ⚡", "success");
    }
    
    elements.onboardingOverlay.classList.add('hidden');
}

// ==========================================================================
// CENTRAL DE GOVERNANÇA (PAINEL ADMIN 2.0) LOGIC
// ==========================================================================

async function concederCreditosBonaFide(userId, quantidade) {
    showToast(`Injetando manualmente ${quantidade} raios para o líder... ⚡`, "info");
    
    // Remove card from DOM with a nice fadeout
    const card = document.querySelector(`.queue-item[data-user-id="${userId}"]`);
    if (card) {
        card.style.opacity = 0;
        card.style.transform = "scale(0.9)";
        setTimeout(() => {
            card.remove();
            // Check if queue is empty
            const queueItems = elements.adminSupportQueue.querySelectorAll('.queue-item');
            if (queueItems.length === 0) {
                elements.adminQueueEmptyState.classList.remove('hidden');
            }
        }, 300);
    }
    
    // If it is the logged-in user, we can add it to their session!
    if (userProfile && userId === userProfile.id) {
        userProfile.creditos += quantidade;
        updateCreditsUI();
    } else if (userId === 'u_8372' || userId === 'u_1944') {
        setTimeout(() => {
            showToast(`+${quantidade} Raios injetados com sucesso! ⚡`, "success");
        }, 500);
    }
}

function handleAdminUserSearch() {
    const val = elements.adminUserSearchInput.value.trim();
    if (!val) {
        showToast("Digite um e-mail ou UUID para buscar!", "error");
        return;
    }
    showToast(`Buscando por "${val}"... 🔎`, "info");
    setTimeout(() => {
        showToast(`Perfil encontrado! Plano: PREMIUM_ANUAL • Saldo: 100 Raios`, "success");
    }, 800);
}

// Expose admin trigger on global scope
window.concederCreditosBonaFide = concederCreditosBonaFide;

function toggleSidebarCollapse() {
    const sidebar = elements.appSidebar;
    const container = document.querySelector('.app-container');
    const btn = elements.btnCollapseSidebar;
    
    sidebar.classList.toggle('collapsed');
    container.classList.toggle('sidebar-collapsed');
    
    if (sidebar.classList.contains('collapsed')) {
        btn.title = 'Expandir Menu';
    } else {
        btn.title = 'Colapsar Menu';
    }
}
