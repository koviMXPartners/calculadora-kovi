const WEEKLY_GOAL = 55;
const PERIOD_GOAL = 220;
const TOTAL_WEEKS = 4;
const PERIOD_DAYS = 28;

const defaultConfig = {
  app_title: "Calculadora de Productividad KOVI",
  license_plate_label: "Placa del Vehículo",
  weekly_goal_label: "Meta Semanal (55 viajes)",
  period_goal_label: "Meta del Periodo (220 viajes)",
  achievements_title: "🏆 Logros Desbloqueados",
  analytics_title: "📊 Análisis de Progreso",
  ranking_title: "🥇 Mi Rendimiento Personal",
  register_title: "➕ Registrar Viajes",
  history_title: "📋 Historial de Semanas",
  primary_color: "#b02a37",
  secondary_color: "#ff365a",
  background_color: "#ffffff",
  text_color: "#333333",
  font_family: "system-ui",
  font_size: 16
};

let weekRecords = [];
let editingRecord = null;
let currentDriverPlate = null;

const achievements = [
  { id: 'starter', icon: '🚀', name: 'Iniciador', desc: 'Completa primera semana', points: 50, check: (records) => records.length >= 1 },
  { id: 'weekly', icon: '⭐', name: 'Meta Semanal', desc: 'Alcanza meta semanal', points: 100, check: (records) => records.some(r => r.trips >= WEEKLY_GOAL) },
  { id: 'period', icon: '🏆', name: 'Periodo Completado', desc: 'Termina periodo completo', points: 500, check: (records) => records.length === TOTAL_WEEKS },
  { id: 'consistent', icon: '📈', name: 'Consistencia Total', desc: 'Todas las semanas con meta', points: 300, check: (records) => records.length === TOTAL_WEEKS && records.every(r => r.trips >= WEEKLY_GOAL) }
];

function formatLicensePlate(plate) {
  return plate.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 8);
}

function getDriverRecords(records, plate) {
  return records.filter(r => r.license_plate === plate);
}

function updateDriverInfo(plate) {
  currentDriverPlate = plate;
  const driverInfo = document.getElementById('driverInfo');
  const currentPlateEl = document.getElementById('currentPlate');
  
  if (plate) {
    currentPlateEl.textContent = plate;
    driverInfo.style.display = 'block';
    
    // Enable export buttons
    document.getElementById('exportPDF').disabled = false;
    document.getElementById('exportCSV').disabled = false;
  } else {
    driverInfo.style.display = 'none';
    
    // Disable export buttons
    document.getElementById('exportPDF').disabled = true;
    document.getElementById('exportCSV').disabled = true;
  }
}

function calculatePoints(records) {
  let totalPoints = 0;
  
  // Points per trip
  records.forEach(record => {
    totalPoints += record.trips * 2; // 2 points per trip
    
    // Bonus for meeting weekly goal
    if (record.trips >= WEEKLY_GOAL) {
      totalPoints += 50;
    }
    
    // Bonus for exceeding weekly goal
    if (record.trips > WEEKLY_GOAL) {
      totalPoints += (record.trips - WEEKLY_GOAL) * 3;
    }
  });
  
  // Achievement points
  achievements.forEach(achievement => {
    if (achievement.check(records)) {
      totalPoints += achievement.points;
    }
  });
  
  return totalPoints;
}

function calculateMetrics(records) {
  const periodTrips = records.reduce((sum, r) => sum + r.trips, 0);
  const completedWeeks = records.filter(r => r.trips >= WEEKLY_GOAL).length;
  const completionRate = records.length > 0 ? Math.round((completedWeeks / TOTAL_WEEKS) * 100) : 0;
  const efficiencyScore = records.length > 0 ? Math.min(Math.round((periodTrips / (records.length * WEEKLY_GOAL)) * 100), 100) : 0;
  const daysRemaining = Math.max(0, PERIOD_DAYS - (records.length * 7));
  const tripsNeeded = Math.max(0, PERIOD_GOAL - periodTrips);
  const weeklyPace = daysRemaining > 0 ? (tripsNeeded / daysRemaining).toFixed(1) : 0;
  const driverLevel = Math.max(1, Math.floor(completedWeeks / 2) + 1);
  const totalPoints = calculatePoints(records);
  
  const currentWeek = records.find(r => r.week_number === records.length);
  const weeklyTrips = currentWeek ? currentWeek.trips : 0;

  let nextMilestone = WEEKLY_GOAL;
  if (periodTrips >= PERIOD_GOAL) {
    nextMilestone = periodTrips;
  } else if (weeklyTrips >= WEEKLY_GOAL) {
    nextMilestone = Math.ceil(periodTrips / 50) * 50 + 50;
  }

  return {
    periodTrips,
    weeklyTrips,
    completionRate,
    efficiencyScore,
    weeklyPace,
    driverLevel,
    daysRemaining,
    tripsNeeded,
    nextMilestone,
    totalPoints
  };
}

function calculateProjection(records) {
  if (records.length === 0) return 0;
  
  const totalTrips = records.reduce((sum, r) => sum + r.trips, 0);
  const avgPerWeek = totalTrips / records.length;
  const remainingWeeks = TOTAL_WEEKS - records.length;
  
  return Math.round(totalTrips + (avgPerWeek * remainingWeeks));
}

function checkAchievements(records) {
  const unlockedBefore = new Set(achievements.filter(a => a.check(weekRecords.filter(r => r.license_plate === currentDriverPlate))).map(a => a.id));
  const unlockedNow = new Set(achievements.filter(a => a.check(records)).map(a => a.id));
  
  const newAchievements = [...unlockedNow].filter(id => !unlockedBefore.has(id));
  
  return { unlocked: unlockedNow, newAchievements };
}

function showAlert(type, title, message) {
  const alertContainer = document.getElementById('alertContainer');
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  
  const icons = {
    success: '✅',
    warning: '⚠️',
    info: 'ℹ️',
    achievement: '🎉'
  };
  
  alert.innerHTML = `
    <div class="alert-icon">${icons[type] || 'ℹ️'}</div>
    <div class="alert-content">
      <div class="alert-title">${title}</div>
      <div>${message}</div>
    </div>
  `;
  
  alertContainer.appendChild(alert);
  
  setTimeout(() => {
    alert.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => alert.remove(), 300);
  }, 5000);
}

function checkAlerts(records, metrics) {
  if (metrics.periodTrips >= PERIOD_GOAL) {
    showAlert('success', '¡Meta Alcanzada!', `Has completado la meta del periodo con ${metrics.periodTrips} viajes y ${metrics.totalPoints} puntos.`);
  } else if (records.length === TOTAL_WEEKS && metrics.periodTrips < PERIOD_GOAL) {
    showAlert('warning', 'Periodo Completado', `Periodo finalizado con ${metrics.periodTrips} viajes y ${metrics.totalPoints} puntos. ¡Sigue mejorando!`);
  } else if (metrics.periodTrips >= PERIOD_GOAL * 0.75) {
    showAlert('info', '¡Excelente Progreso!', `Llevas ${metrics.periodTrips} viajes y ${metrics.totalPoints} puntos. ¡Estás muy cerca de la meta!`);
  }

  if (records.length === TOTAL_WEEKS - 1 && metrics.periodTrips < PERIOD_GOAL * 0.75) {
    showAlert('warning', 'Última Semana', `Necesitas ${metrics.tripsNeeded} viajes más para alcanzar la meta.`);
  }
}

function renderUI(allRecords) {
  // Si hay registros, usar la placa del primer registro como conductor actual
  if (allRecords.length > 0 && !currentDriverPlate) {
    const plates = [...new Set(allRecords.map(r => r.license_plate))];
    if (plates.length === 1) {
      updateDriverInfo(plates[0]);
    }
  }

  const driverRecords = currentDriverPlate ? getDriverRecords(allRecords, currentDriverPlate) : [];
  const metrics = calculateMetrics(driverRecords);
  const { unlocked, newAchievements } = checkAchievements(driverRecords);

  document.getElementById('daysRemaining').textContent = metrics.daysRemaining;
  document.getElementById('completionRate').textContent = `${metrics.completionRate}%`;
  document.getElementById('totalPoints').textContent = metrics.totalPoints;
  document.getElementById('driverLevel').textContent = metrics.driverLevel;
  document.getElementById('periodTrips').textContent = metrics.periodTrips;
  document.getElementById('weeklyTrips').textContent = metrics.weeklyTrips;
  document.getElementById('weeklyPace').textContent = metrics.weeklyPace;
  document.getElementById('nextMilestone').textContent = metrics.nextMilestone;

  const periodPercent = Math.min((metrics.periodTrips / PERIOD_GOAL) * 100, 100);
  const weeklyPercent = Math.min((metrics.weeklyTrips / WEEKLY_GOAL) * 100, 100);
  document.getElementById('periodProgress').style.width = `${periodPercent}%`;
  document.getElementById('weeklyProgress').style.width = `${weeklyPercent}%`;

  renderAchievements(unlocked);
  renderAnalytics(driverRecords);
  renderRanking(allRecords);
  renderHistory(allRecords);

  if (newAchievements.length > 0) {
    newAchievements.forEach(id => {
      const achievement = achievements.find(a => a.id === id);
      showAlert('achievement', '¡Logro Desbloqueado!', `${achievement.icon} ${achievement.name}: ${achievement.desc} (+${achievement.points} puntos)`);
    });
  }

  if (currentDriverPlate) {
    checkAlerts(driverRecords, metrics);
  }
}

function renderAchievements(unlocked) {
  const grid = document.getElementById('achievementsGrid');
  grid.innerHTML = achievements.map(a => `
    <div class="achievement-card ${unlocked.has(a.id) ? 'unlocked' : 'locked'}">
      <div class="achievement-points">+${a.points}</div>
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-name">${a.name}</div>
      <div class="achievement-desc">${a.desc}</div>
    </div>
  `).join('');
}

function renderAnalytics(records) {
  const projection = calculateProjection(records);
  
  document.getElementById('projectionText').textContent = 
    `A este ritmo, completarás ${projection} viajes al final del periodo`;
}

function renderRanking(allRecords) {
  const tbody = document.getElementById('rankingBody');
  
  if (!currentDriverPlate) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999; padding: 20px;">Ingresa tu placa para ver tu posición</td></tr>';
    return;
  }

  const driverRecords = getDriverRecords(allRecords, currentDriverPlate);
  const metrics = calculateMetrics(driverRecords);
  
  // Solo mostrar datos del conductor actual
  const driverStats = {
    plate: currentDriverPlate,
    trips: metrics.periodTrips,
    points: metrics.totalPoints,
    efficiency: metrics.efficiencyScore,
    position: 1 // Siempre primera posición en vista individual
  };
  
  tbody.innerHTML = `
    <tr style="background: #fff5f7;">
      <td class="ranking-position gold">🥇</td>
      <td>${driverStats.plate}</td>
      <td>${driverStats.trips}</td>
      <td>${driverStats.points}</td>
      <td>${driverStats.efficiency}%</td>
    </tr>
    <tr>
      <td colspan="5" style="text-align: center; color: #666; padding: 15px; font-style: italic;">
        📊 Vista individual - Solo tus datos son visibles
      </td>
    </tr>
  `;
}

function renderHistory(allRecords) {
  const grid = document.getElementById('historyGrid');
  
  if (!currentDriverPlate) {
    grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔐</div><div class="empty-state-text">Ingresa tu placa para ver tu historial personal</div></div>';
    return;
  }

  // Solo mostrar registros del conductor actual
  const driverRecords = getDriverRecords(allRecords, currentDriverPlate);
  
  if (driverRecords.length === 0) {
    grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📭</div><div class="empty-state-text">No tienes semanas registradas aún</div></div>';
    return;
  }

  const sortedRecords = driverRecords.sort((a, b) => a.week_number - b.week_number);
  
  const html = sortedRecords.map(record => {
    const percent = Math.min((record.trips / WEEKLY_GOAL) * 100, 100);
    const status = record.trips >= WEEKLY_GOAL ? '✅' : '⏳';
    const points = record.trips * 2 + (record.trips >= WEEKLY_GOAL ? 50 : 0) + (record.trips > WEEKLY_GOAL ? (record.trips - WEEKLY_GOAL)