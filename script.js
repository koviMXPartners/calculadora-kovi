* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #ffffff;
  color: #333333;
  line-height: 1.6;
  min-height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.app-header {
  background: linear-gradient(135deg, #b02a37 0%, #ff365a 100%);
  color: white;
  padding: 30px;
  border-radius: 16px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(176, 42, 55, 0.2);
}

.app-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
}

.driver-info {
  text-align: center;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.driver-plate {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
}

.driver-label {
  font-size: 14px;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.header-metric {
  background: rgba(255, 255, 255, 0.15);
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.header-metric-value {
  font-size: 28px;
  font-weight: 700;
  display: block;
  margin-bottom: 5px;
}

.header-metric-label {
  font-size: 12px;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.metric-card {
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.metric-card:hover {
  border-color: #ff365a;
  box-shadow: 0 4px 12px rgba(255, 54, 90, 0.1);
  transform: translateY(-2px);
}

.metric-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  font-weight: 500;
}

.metric-value {
  font-size: 32px;
  font-weight: 700;
  color: #b02a37;
  margin-bottom: 10px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #b02a37 0%, #ff365a 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
}

/* Achievements */
.achievements-section {
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color: #b02a37;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.achievement-card {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
}

.achievement-card.unlocked {
  background: linear-gradient(135deg, #fff5f7 0%, #ffe8ec 100%);
  border-color: #ff365a;
}

.achievement-card.locked {
  opacity: 0.5;
  filter: grayscale(100%);
}

.achievement-card.new-unlock {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 54, 90, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(255, 54, 90, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 54, 90, 0); }
}

.achievement-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.achievement-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.achievement-desc {
  font-size: 13px;
  color: #666;
}

.achievement-points {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ffc107;
  color: #333;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 12px;
}

/* Analytics Section */
.analytics-section {
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
}

.analytics-card {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.projection-text {
  font-size: 20px;
  color: #b02a37;
  font-weight: 600;
  padding: 20px;
  background: linear-gradient(135deg, #fff5f7 0%, #ffe8ec 100%);
  border-radius: 8px;
  margin-bottom: 20px;
}

.export-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-export {
  background: #28a745;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-export:hover {
  background: #218838;
  transform: translateY(-1px);
}

.btn-export:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Ranking Section */
.ranking-section {
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
}

.ranking-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.ranking-table th,
.ranking-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.ranking-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #b02a37;
}

.ranking-position {
  font-weight: 700;
  font-size: 18px;
  color: #b02a37;
}

.ranking-position.gold {
  color: #ffc107;
}

/* Form Section */
.form-section {
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.form-input {
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #ff365a;
  box-shadow: 0 0 0 3px rgba(255, 54, 90, 0.1);
}

.btn {
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.btn-primary {
  background: linear-gradient(135deg, #b02a37 0%, #ff365a 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(176, 42, 55, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* History Section */
.history-section {
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
}

.history-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
}

.week-card {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 20px;
  transition: all 0.3s ease;
}

.week-card:hover {
  border-color: #ff365a;
  box-shadow: 0 4px 12px rgba(255, 54, 90, 0.1);
}

.week-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.week-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.week-number {
  font-size: 18px;
  font-weight: 700;
  color: #b02a37;
}

.week-plate {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.week-status {
  font-size: 20px;
}

.week-trips {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.week-points {
  font-size: 14px;
  color: #ffc107;
  font-weight: 600;
  margin-bottom: 10px;
}

.week-actions {
  display: flex;
  gap: 8px;
  margin-top: 15px;
}

.btn-small {
  padding: 8px 16px;
  font-size: 14px;
  flex: 1;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

/* Alert */
.alert {
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-success {
  background: #d4edda;
  border: 2px solid #28a745;
  color: #155724;
}

.alert-warning {
  background: #fff3cd;
  border: 2px solid #ffc107;
  color: #856404;
}

.alert-info {
  background: #d1ecf1;
  border: 2px solid #17a2b8;
  color: #0c5460;
}

.alert-achievement {
  background: linear-gradient(135deg, #fff5f7 0%, #ffe8ec 100%);
  border: 2px solid #ff365a;
  color: #b02a37;
}

.alert-icon {
  font-size: 24px;
}

.alert-content {
  flex: 1;
}

.alert-title {
  font-weight: 700;
  margin-bottom: 4px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.empty-state-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-state-text {
  font-size: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .app-title {
    font-size: 24px;
  }

  .header-metrics {
    grid-template-columns: repeat(2, 1fr);
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .achievements-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .history-grid {
    grid-template-columns: 1fr;
  }

  .ranking-table {
    font-size: 14px;
  }

  .ranking-table th,
  .ranking-table td {
    padding: 8px;
  }

  .export-buttons {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  body {
    padding: 10px;
  }

  .app-header {
    padding: 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
