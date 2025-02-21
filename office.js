// Ekipman güçlendirme bonusları
const upgradeBonuses = {
    shoes: {
        offense: 1.5,
        defense: 1.5
    },
    kneepads: {
        defense: 2
    },
    jersey: {
        defense: 2
    },
    wristband: {
        offense: 2
    },
    headband: {
        offense: 2
    }
};

// Ekipman verileri
const equipmentData = {
    shoes: [
        { id: 'shoe1', name: 'Temel Ayakkabı', rarity: 'common', boosts: { offense: 1, defense: 1 }, image: 'images/shoes/basic.png' },
        { id: 'shoe2', name: 'Hızlı Koşucu', rarity: 'rare', boosts: { offense: 2, defense: 2 }, image: 'images/shoes/runner.png' },
        { id: 'shoe3', name: 'Pro Performer', rarity: 'epic', boosts: { offense: 3, defense: 3 }, image: 'images/shoes/pro.png' },
        { id: 'shoe4', name: 'Efsane Ayakkabı', rarity: 'legendary', boosts: { offense: 4, defense: 4 }, image: 'images/shoes/legend.png' },
        { id: 'shoe5', name: 'Mitik Uçuş', rarity: 'mythical', boosts: { offense: 5, defense: 5 }, image: 'images/shoes/mythic.png' }
    ],
    kneepads: [
        { id: 'knee1', name: 'Basit Dizlik', rarity: 'common', boosts: { defense: 2 }, image: 'images/kneepads/basic.png' },
        { id: 'knee2', name: 'Koruyucu Dizlik', rarity: 'rare', boosts: { defense: 4 }, image: 'images/kneepads/protector.png' },
        { id: 'knee3', name: 'Elite Dizlik', rarity: 'epic', boosts: { defense: 6 }, image: 'images/kneepads/elite.png' },
        { id: 'knee4', name: 'Efsane Dizlik', rarity: 'legendary', boosts: { defense: 8 }, image: 'images/kneepads/legend.png' },
        { id: 'knee5', name: 'Mitik Dizlik', rarity: 'mythical', boosts: { defense: 10 }, image: 'images/kneepads/mythic.png' }
    ],
    jersey: [
        { id: 'jersey1', name: 'Standart Forma', rarity: 'common', boosts: { defense: 2 }, image: 'images/beyazforma.png' },
        { id: 'jersey2', name: 'Pro Forma', rarity: 'rare', boosts: { defense: 4 }, image: 'images/jerseys/pro.png' },
        { id: 'jersey3', name: 'Elite Forma', rarity: 'epic', boosts: { defense: 6 }, image: 'images/jerseys/elite.png' },
        { id: 'jersey4', name: 'Efsane Forma', rarity: 'legendary', boosts: { defense: 8 }, image: 'images/jerseys/legend.png' },
        { id: 'jersey5', name: 'Mitik Forma', rarity: 'mythical', boosts: { defense: 10 }, image: 'images/jerseys/mythic.png' }
    ],
    wristband: [
        { id: 'wrist1', name: 'Basit Bileklik', rarity: 'common', boosts: { offense: 2 }, image: 'images/beyazband.png' },
        { id: 'wrist2', name: 'Şutör Bilekliği', rarity: 'rare', boosts: { offense: 4 }, image: 'images/wristbands/shooter.png' },
        { id: 'wrist3', name: 'Pro Bileklik', rarity: 'epic', boosts: { offense: 6 }, image: 'images/wristbands/pro.png' },
        { id: 'wrist4', name: 'Efsane Bileklik', rarity: 'legendary', boosts: { offense: 8 }, image: 'images/wristbands/legend.png' },
        { id: 'wrist5', name: 'Mitik Bileklik', rarity: 'mythical', boosts: { offense: 10 }, image: 'images/wristbands/mythic.png' }
    ],
    headband: [
        { id: 'head1', name: 'Basit Kafa Bandı', rarity: 'common', boosts: { offense: 2 }, image: 'images/beyazkafabandı.png' },
        { id: 'head2', name: 'Odak Bandı', rarity: 'rare', boosts: { offense: 4 }, image: 'images/headbands/focus.png' },
        { id: 'head3', name: 'Pro Kafa Bandı', rarity: 'epic', boosts: { offense: 6 }, image: 'images/headbands/pro.png' },
        { id: 'head4', name: 'Efsane Kafa Bandı', rarity: 'legendary', boosts: { offense: 8 }, image: 'images/headbands/legend.png' },
        { id: 'head5', name: 'Mitik Kafa Bandı', rarity: 'mythical', boosts: { offense: 10 }, image: 'images/headbands/mythic.png' }
    ]
};

// Seçili oyuncuyu takip etmek için
let selectedPlayer = null;

// Global değişkenler
let currentPlayerPage = 0;
const playersPerPage = 1;

// Mevcut oyuncu indeksini tut
let currentPlayerIndex = 0;

// Ekipman envanterini tutacak global değişken
let equipmentInventory = {};

let isDragging = false;
let currentDraggedElement = null;
let touchOffset = { x: 0, y: 0 };

let selectedEquipment = null;
let playerSelectionModal = null;

document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    loadEquipmentInventory();
    initializeEquipmentSystem();
    initializeDragAndDrop();
    initializeMobileEquipmentSystem();
    
    // Para göstergesini başlat
    initializeMoneyDisplay();
    
    // Oyuncuları görüntüle (null kontrolü ile)
    const playerList = document.getElementById('player-list');
    if (playerList) {
        displayPlayers();
    }
});

// Oyuncuları görüntüleme fonksiyonu
function displayPlayers() {
    const playerList = document.getElementById('player-list');
    if (!playerList) return; // playerList null ise fonksiyondan çık

    playerList.innerHTML = '';
    
    myTeam.forEach(player => {
        if (!player) return;

        // Efsanevi ekipman sayısını kontrol et
        const legendaryCount = countLegendaryEquipment(player);
        const cardClass = legendaryCount >= 5 ? 'player-card legendary-equipped' : 'player-card';
        
        const card = document.createElement('div');
        card.className = cardClass;
        card.dataset.playerId = player.name;
        
        card.innerHTML = `
            <div class="player-info">
                <img src="${player.image}" alt="${player.name}" class="player-image">
                <h3 class="player-name">${player.name}</h3>
                <div class="player-position">${player.position}</div>
                <div class="player-stats">
                    <div class="stat-item">
                        <span>Hücum:</span>
                        <span>${player.offense}</span>
                    </div>
                    <div class="stat-item">
                        <span>Savunma:</span>
                        <span>${player.defense}</span>
                    </div>
                    <div class="stat-item">
                        <span>Sayı:</span>
                        <span>${player.points}</span>
                    </div>
                    <div class="stat-item">
                        <span>Asist:</span>
                        <span>${player.assists}</span>
                    </div>
                    <div class="stat-item">
                        <span>Rebound:</span>
                        <span>${player.rebounds}</span>
                    </div>
                </div>
                <div class="equipment-slots">
                    ${Object.keys(equipmentData).map(category => `
                        <div class="equipment-slot ${player.equipment?.[category]?.rarity || ''}"
                             data-category="${category}">
                            ${player.equipment?.[category] ? `
                                <img src="${player.equipment[category].image}" 
                                     alt="${player.equipment[category].name}"
                                     title="${player.equipment[category].name}">
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        playerList.appendChild(card);
    });

    initializeDragAndDrop();
}

// Seçili oyuncuyu vurgulama
function highlightSelectedPlayer(selectedCard) {
    document.querySelectorAll('.player-card').forEach(card => {
        card.classList.remove('selected');
    });
    selectedCard.classList.add('selected');
}

// Ekipman envanterini yükle
function loadEquipmentInventory() {
    const savedEquipment = localStorage.getItem('ownedEquipment');
    if (savedEquipment) {
        equipmentInventory = JSON.parse(savedEquipment);
        // Ekipmanları görüntüle
        displayEquipment();
    }
}

// Ekipmanları görüntüle
function displayEquipment() {
    Object.keys(equipmentData).forEach(category => {
        const grid = document.getElementById(`${category}-grid`);
        if (!grid) return;

        grid.innerHTML = '';
        
        const ownedItems = equipmentInventory[category] || [];
        
        ownedItems.forEach(item => {
            // Eğer ekipman bir oyuncuda takılı değilse göster
            if (!isEquipmentEquipped(item.id, category)) {
                const card = document.createElement('div');
                card.className = `equipment-card ${item.rarity}`;
                card.draggable = true;
                card.dataset.itemId = item.id;
                card.dataset.category = category;
                
                const level = item.level ? `+${item.level}` : '';
                const boostText = Object.entries(item.boosts)
                    .map(([stat, value]) => `${stat}: ${value}`)
                    .join(', ');

                card.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="equipment-info">
                        <div class="equipment-name">${item.name} ${level}</div>
                        <div class="equipment-stats">${boostText}</div>
                    </div>
                `;

                card.addEventListener('dragstart', handleDragStart);
                grid.appendChild(card);
            }
        });
    });
}

// Ekipmanı oyuncuya giydir ve envanteri güncelle
function equipItemToPlayer(player, category, uniqueId) {
    // Envanterde ekipmanı bul
    const itemIndex = equipmentInventory[category].findIndex(i => i.uniqueId === uniqueId);
    if (itemIndex === -1) return;

    const item = equipmentInventory[category][itemIndex];

    // Önceki ekipmanı geri al ve bonusları kaldır (varsa)
    if (player.equipment && player.equipment[category]) {
        const oldItem = player.equipment[category];
        removeEquipmentBoosts(player, oldItem);
        
        const oldItemId = oldItem.uniqueId;
        const oldItemIndex = equipmentInventory[category].findIndex(i => i.uniqueId === oldItemId);
        if (oldItemIndex !== -1) {
            equipmentInventory[category][oldItemIndex].available = true;
        }
    }

    // Yeni ekipmanı giydir ve bonusları uygula
    equipmentInventory[category][itemIndex].available = false;
    player.equipment = player.equipment || {};
    player.equipment[category] = item;
    
    // Yeni ekipmanın bonuslarını uygula
    applyEquipmentBoosts(player, item);

    // Oyuncuyu takımda güncelle
    const playerIndex = myTeam.findIndex(p => p.name === player.name);
    if (playerIndex !== -1) {
        myTeam[playerIndex] = player;
    }

    // Ekipman durumlarını kaydet
    const equippedItems = JSON.parse(localStorage.getItem('equippedItems') || '{}');
    if (!equippedItems[player.name]) {
        equippedItems[player.name] = {};
    }
    equippedItems[player.name][category] = uniqueId;
    localStorage.setItem('equippedItems', JSON.stringify(equippedItems));

    // Envanter ve oyuncu durumunu kaydet
    saveEquipmentState();
    saveGame();
    
    // UI'ı güncelle
    displayEquipment();
    displayPlayers();
    showNotification(`${item.name} başarıyla ${player.name}'e giydirildi! (Hücum: +${item.boosts.offense || 0}, Savunma: +${item.boosts.defense || 0})`);
}

// Ekipman durumunu kaydet
function saveEquipmentState() {
    // Envanter durumunu kaydet
    localStorage.setItem('equipmentInventory', JSON.stringify(equipmentInventory));
}

function selectPlayer(playerId) {
    selectedPlayer = myTeam.find(p => p.name === playerId);
    
    // Görsel seçim efekti
    document.querySelectorAll('.player-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-player-id="${playerId}"]`).classList.add('selected');
}

function equipItem(playerName, category, equipment) {
    const player = myTeam.find(p => p.name === playerName);
    if (!player) return;

    // Ekipman zaten kullanımda mı kontrol et
    if (isEquipmentInUse(equipment.id, category)) {
        showNotification('Bu ekipman başka bir oyuncu tarafından kullanılıyor!', 'error');
        return;
    }

    // Mevcut ekipmanı çıkar ve statları düzelt
    if (player.equipment && player.equipment[category]) {
        const oldEquipment = player.equipment[category];
        if (oldEquipment.boosts) {
            if (oldEquipment.boosts.offense) {
                player.offense = Math.max(0, player.offense - oldEquipment.boosts.offense);
            }
            if (oldEquipment.boosts.defense) {
                player.defense = Math.max(0, player.defense - oldEquipment.boosts.defense);
            }
        }
    }

    // Yeni ekipmanı tak
    if (!player.equipment) {
        player.equipment = {};
    }
    
    // Ekipmanın güncel halini envanterde bul
    const ownedEquipment = equipmentInventory[category].find(eq => eq.id === equipment.id);
    player.equipment[category] = ownedEquipment; // Güncel ekipmanı kullan

    // Yeni ekipmanın bonuslarını uygula
    if (ownedEquipment.boosts) {
        // Hücum bonusu
        if (ownedEquipment.boosts.offense) {
            const offenseBonus = ownedEquipment.boosts.offense;
            const levelBonus = (ownedEquipment.level || 0);
            player.offense += (offenseBonus + levelBonus);
        }
        
        // Savunma bonusu
        if (ownedEquipment.boosts.defense) {
            const defenseBonus = ownedEquipment.boosts.defense;
            const levelBonus = (ownedEquipment.level || 0);
            player.defense += (defenseBonus + levelBonus);
        }
    }

    // Oyun verilerini kaydet
    saveGame();
    
    // Arayüzü güncelle
    displayPlayers();
    initializeEquipmentSystem(); // Ekipman kartlarını yeniden oluştur
    
    // Bildirim göster
    const totalOffenseBonus = (ownedEquipment.boosts.offense || 0) + (ownedEquipment.level || 0);
    const totalDefenseBonus = (ownedEquipment.boosts.defense || 0) + (ownedEquipment.level || 0);
    const bonusText = `(${totalOffenseBonus > 0 ? `+${totalOffenseBonus} Hücum` : ''} ${totalDefenseBonus > 0 ? `+${totalDefenseBonus} Savunma` : ''})`;
    showNotification(`${equipment.name} başarıyla ${player.name}'e takıldı! ${bonusText}`, 'success');
}

function getEquipmentBonusesSummary(player) {
    if (!player.equipment) return '';

    let bonusSummary = '<div class="bonus-summary">';
    let totalOffense = 0;
    let totalDefense = 0;

    Object.entries(player.equipment).forEach(([slot, item]) => {
        if (item && item.boosts) {
            bonusSummary += `<div class="equipment-bonus ${item.rarity}">
                <span class="equipment-name">${item.name} +${item.level || 0}</span>
                <div class="bonus-stats">`;

            Object.entries(item.boosts).forEach(([stat, value]) => {
                const formattedValue = Math.round(value * 10) / 10;
                if (stat === 'offense') totalOffense += value;
                if (stat === 'defense') totalDefense += value;
                bonusSummary += `<span class="stat-boost">+${formattedValue} ${stat}</span>`;
            });

            bonusSummary += '</div></div>';
        }
    });

    // Toplam bonusları göster
    if (totalOffense > 0 || totalDefense > 0) {
        bonusSummary += `<div class="total-bonuses">
            <span class="total-title">Toplam Bonuslar:</span>
            ${totalOffense > 0 ? `<span class="total-offense">+${Math.round(totalOffense * 10) / 10} Hücum</span>` : ''}
            ${totalDefense > 0 ? `<span class="total-defense">+${Math.round(totalDefense * 10) / 10} Savunma</span>` : ''}
        </div>`;
    }

    bonusSummary += '</div>';
    return bonusSummary;
}

// Sürükle-bırak işlemleri için fonksiyonlar
function initializeDragAndDrop() {
    // Mevcut mouse olayları
    const draggableItems = document.querySelectorAll('.equipment-card');
    draggableItems.forEach(item => {
        item.setAttribute('draggable', true);
        
        // Mouse olayları
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        
        // Touch olayları
        item.addEventListener('touchstart', handleTouchStart, { passive: false });
        item.addEventListener('touchmove', handleTouchMove, { passive: false });
        item.addEventListener('touchend', handleTouchEnd);
    });

    // Drop hedefleri için olay dinleyicileri
    const dropTargets = document.querySelectorAll('.player-card');
    dropTargets.forEach(target => {
        target.addEventListener('dragover', handleDragOver);
        target.addEventListener('dragleave', handleDragLeave);
        target.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(event) {
    const card = event.target.closest('.equipment-card');
    if (!card) return;
    
    event.dataTransfer.setData('itemId', card.dataset.itemId);
    event.dataTransfer.setData('category', card.dataset.category);
}

function handleDragEnd(e) {
    const item = e.target;
    item.classList.remove('dragging');
    
    // Eğer bırakma işlemi başarısız olduysa (bir oyuncu üzerine bırakılmadıysa)
    if (!e.dataTransfer.dropEffect || e.dataTransfer.dropEffect === 'none') {
        // Animasyonla orijinal konumuna geri dön
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '1';
        item.style.visibility = 'visible';
    }
}

function handleDragOver(event) {
    event.preventDefault();
    const playerCard = event.target.closest('.player-card');
    if (playerCard) {
        playerCard.classList.add('drag-over');
    }
}

function handleDragLeave(event) {
    const playerCard = event.target.closest('.player-card');
    if (playerCard) {
        playerCard.classList.remove('drag-over');
    }
}

function handleDrop(event) {
    event.preventDefault();
    
    const playerCard = event.target.closest('.player-card');
    if (!playerCard) return;
    
    playerCard.classList.remove('drag-over');
    
    const itemId = event.dataTransfer.getData('itemId');
    const category = event.dataTransfer.getData('category');
    const playerId = playerCard.dataset.playerId;
    
    // Sürüklenen ekipman elementini bul
    const draggedEquipment = document.querySelector(`.equipment-card[data-item-id="${itemId}"][data-category="${category}"]`);
    
    // Oyuncuyu ve ekipmanı bul
    const player = myTeam.find(p => p.name === playerId);
    const item = equipmentInventory[category]?.find(i => i.id === itemId);
    
    if (player && item) {
        // Oyuncunun base statlarını kaydet
        if (typeof player.baseOffense === 'undefined') {
            player.baseOffense = player.offense;
            player.baseDefense = player.defense;
        }
        
        // Mevcut ekipmanın bonuslarını kaldır
        if (player.equipment?.[category]) {
            const currentItem = player.equipment[category];
            if (currentItem.boosts) {
                if (currentItem.boosts.offense) {
                    player.offense = player.baseOffense;
                }
                if (currentItem.boosts.defense) {
                    player.defense = player.baseDefense;
                }
            }
        }
        
        // Yeni ekipmanı giydir ve bonusları uygula
        player.equipment = player.equipment || {};
        player.equipment[category] = { ...item };
        
        // Yeni bonusları uygula
        if (item.boosts) {
            if (item.boosts.offense) {
                player.offense = (player.baseOffense || player.offense) + item.boosts.offense;
            }
            if (item.boosts.defense) {
                player.defense = (player.baseDefense || player.defense) + item.boosts.defense;
            }
        }
        
        // Ekipmanı envanterden kaldır
        if (draggedEquipment) {
            draggedEquipment.style.display = 'none';
            // Animasyon ekle
            draggedEquipment.style.transition = 'all 0.3s ease';
            draggedEquipment.style.transform = 'scale(0)';
            draggedEquipment.style.opacity = '0';
        }
        
        // Değişiklikleri kaydet
        saveGame();
        
        // UI'ı güncelle
        displayPlayers();
        
        // Bildirim göster
        showNotification(`${item.name} başarıyla ${player.name}'e giydirildi!`);
        
        // Ekipman slotunu güncelle
        const equipmentSlot = playerCard.querySelector(`.equipment-slot[data-category="${category}"]`);
        if (equipmentSlot) {
            equipmentSlot.innerHTML = `
                <img src="${item.image}" 
                     alt="${item.name}"
                     title="${item.name}">
            `;
            equipmentSlot.className = `equipment-slot ${item.rarity}`;
        }

        // Efsanevi efekti güncelle
        updateLegendaryEffect(player, playerCard);
    }
}

// Ekipman bonuslarını uygula
function applyEquipmentBoosts(player, item) {
    if (item.boosts.offense) {
        player.offense = (player.offense || 0) + item.boosts.offense;
    }
    if (item.boosts.defense) {
        player.defense = (player.defense || 0) + item.boosts.defense;
    }
}

// Ekipman bonuslarını kaldır
function removeEquipmentBoosts(player, item) {
    if (item.boosts.offense) {
        player.offense = (player.offense || 0) - item.boosts.offense;
    }
    if (item.boosts.defense) {
        player.defense = (player.defense || 0) - item.boosts.defense;
    }
}

// Sayfalama fonksiyonları
function nextPlayer() {
    if ((currentPlayerPage + 1) * playersPerPage < myTeam.length) {
        currentPlayerPage++;
        displayPlayers();
    }
}

function previousPlayer() {
    if (currentPlayerPage > 0) {
        currentPlayerPage--;
        displayPlayers();
    }
}

// Next butonu için event listener
document.getElementById('nextPlayerBtn').addEventListener('click', () => {
    // Tüm oyuncuları al
    const allPlayers = myTeam.filter(player => player !== null);
    
    // Sonraki oyuncuya geç
    currentPlayerIndex = (currentPlayerIndex + 1) % allPlayers.length;
    
    // Yeni oyuncuyu göster
    displayPlayerDetails(allPlayers[currentPlayerIndex]);
});

// Legendary ekipman kontrolü yapılan yerde:
if (legendaryEquipmentCount >= 5) {
    playerCard.classList.add('legendary-player');
    
    // Parıltı efekti için yeni div
    const sparkleEffect = document.createElement('div');
    sparkleEffect.classList.add('legendary-sparkle');
    playerCard.appendChild(sparkleEffect);
} 

// Para miktarını ayarla
localStorage.setItem('money', '5500');

// Para göstergesini güncelle
function initializeMoneyDisplay() {
    // Önce para göstergesinin var olup olmadığını kontrol et
    const moneyDisplay = document.getElementById('money-display');
    if (!moneyDisplay) {
        // Para göstergesi yoksa oluştur
        const moneyDiv = document.createElement('div');
        moneyDiv.className = 'money-display';
        moneyDiv.innerHTML = `
            <span class="coin-icon">🪙</span>
            <span id="money-display">$${localStorage.getItem('money') || '5500'}</span>
        `;
        document.body.appendChild(moneyDiv);
    } else {
        // Varsa sadece değeri güncelle
        moneyDisplay.textContent = `$${localStorage.getItem('money') || '5500'}`;
    }
}

// Para göstergesini güncelleme fonksiyonu
function updateMoneyDisplay() {
    const moneyDisplay = document.getElementById('money-display');
    if (moneyDisplay) {
        moneyDisplay.textContent = `$${localStorage.getItem('money') || '5500'}`;
    }
}

// Ekipman bonuslarını hesapla
function calculateEquipmentBonuses(player) {
    let totalOffense = 0;
    let totalDefense = 0;

    if (player.equipment) {
        Object.values(player.equipment).forEach(item => {
            if (item.boosts) {
                if (item.boosts.offense) totalOffense += item.boosts.offense;
                if (item.boosts.defense) totalDefense += item.boosts.defense;
            }
        });
    }

    return { offense: totalOffense, defense: totalDefense };
}

// Ekipmanın herhangi bir oyuncuda takılı olup olmadığını kontrol et
function isEquipmentEquipped(itemId, category) {
    return myTeam.some(player => 
        player.equipment?.[category]?.id === itemId
    );
}

// Efsanevi ekipman sayısını hesapla
function countLegendaryEquipment(player) {
    if (!player.equipment) return 0;
    
    return Object.values(player.equipment).filter(item => 
        item && item.rarity === 'legendary'
    ).length;
}

// Ekipman takıldığında veya çıkarıldığında efekti güncelle
function updateLegendaryEffect(player, playerCard) {
    const legendaryCount = countLegendaryEquipment(player);
    
    if (legendaryCount >= 5) {
        playerCard.classList.add('legendary-equipped');
        
        // Alev emojisi için element
        let fireEmoji = playerCard.querySelector('.fire-emoji');
        if (!fireEmoji) {
            fireEmoji = document.createElement('div');
            fireEmoji.className = 'fire-emoji';
            fireEmoji.innerHTML = '🔥';
            playerCard.appendChild(fireEmoji);
        }
    } else {
        playerCard.classList.remove('legendary-equipped');
        const fireEmoji = playerCard.querySelector('.fire-emoji');
        if (fireEmoji) {
            fireEmoji.remove();
        }
    }
}

// Touch olayları için yeni fonksiyonlar
function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const item = e.currentTarget;
    
    isDragging = true;
    currentDraggedElement = item;
    
    // Dokunma noktası ile element pozisyonu arasındaki farkı hesapla
    const rect = item.getBoundingClientRect();
    touchOffset.x = touch.clientX - rect.left;
    touchOffset.y = touch.clientY - rect.top;
    
    // Sürüklenen elementin görsel stilini ayarla
    item.style.opacity = '0.8';
    item.classList.add('dragging');
    
    // Sürüklenen elementin klonunu oluştur
    const clone = item.cloneNode(true);
    clone.id = 'dragging-clone';
    clone.style.position = 'fixed';
    clone.style.pointerEvents = 'none';
    clone.style.zIndex = '1000';
    document.body.appendChild(clone);
    
    updateClonePosition(touch.clientX, touch.clientY, clone);
}

function handleTouchMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const clone = document.getElementById('dragging-clone');
    
    if (clone) {
        updateClonePosition(touch.clientX, touch.clientY, clone);
    }
    
    // Drop hedeflerini kontrol et
    const dropTarget = getDropTargetAtPoint(touch.clientX, touch.clientY);
    
    // Önceki hover efektlerini temizle
    document.querySelectorAll('.player-card').forEach(card => {
        card.classList.remove('drag-over');
    });
    
    if (dropTarget) {
        dropTarget.classList.add('drag-over');
    }
}

function handleTouchEnd(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.changedTouches[0];
    const dropTarget = getDropTargetAtPoint(touch.clientX, touch.clientY);
    
    if (dropTarget && currentDraggedElement) {
        // Drop işlemini gerçekleştir
        const equipmentData = {
            id: currentDraggedElement.dataset.itemId,
            category: currentDraggedElement.dataset.category
        };
        
        handleEquipmentDrop(dropTarget, equipmentData);
    }
    
    // Temizlik
    cleanup();
}

function updateClonePosition(x, y, clone) {
    clone.style.left = `${x - touchOffset.x}px`;
    clone.style.top = `${y - touchOffset.y}px`;
}

function getDropTargetAtPoint(x, y) {
    return document.elementFromPoint(x, y)?.closest('.player-card');
}

function cleanup() {
    isDragging = false;
    currentDraggedElement?.classList.remove('dragging');
    currentDraggedElement?.style.removeProperty('opacity');
    currentDraggedElement = null;
    
    document.querySelectorAll('.player-card').forEach(card => {
        card.classList.remove('drag-over');
    });
    
    const clone = document.getElementById('dragging-clone');
    clone?.remove();
}

// Ekipman düşürme işlemini gerçekleştir
function handleEquipmentDrop(playerCard, equipmentData) {
    const playerId = playerCard.dataset.playerId;
    const player = myTeam.find(p => p.name === playerId);
    
    if (player) {
        equipItem(player.name, equipmentData.category, equipmentData.id);
        saveGame();
        displayPlayers();
    }
}

// Mobil dokunma olayları için yeni fonksiyonlar
function initializeMobileEquipmentSystem() {
    const equipmentItems = document.querySelectorAll('.equipment-item');
    const playerCards = document.querySelectorAll('.player-card');

    // Ekipman seçme işlemi
    equipmentItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Önceki seçili ekipmanı temizle
            if (selectedEquipment) {
                selectedEquipment.classList.remove('selected-equipment');
                document.querySelectorAll('.player-card').forEach(card => {
                    card.classList.remove('awaiting-equipment');
                });
            }

            // Yeni ekipmanı seç
            selectedEquipment = this;
            this.classList.add('selected-equipment');

            // Uygun oyuncuları vurgula
            playerCards.forEach(card => {
                if (canEquipToPlayer(selectedEquipment, card)) {
                    card.classList.add('awaiting-equipment');
                }
            });
        });
    });

    // Oyuncu seçme işlemi
    playerCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (selectedEquipment && this.classList.contains('awaiting-equipment')) {
                const equipmentId = selectedEquipment.getAttribute('data-id');
                const playerId = this.getAttribute('data-player-id');
                
                // Ekipmanı oyuncuya uygula
                handleEquipmentDrop(equipmentId, playerId);

                // Seçimleri temizle
                selectedEquipment.classList.remove('selected-equipment');
                document.querySelectorAll('.player-card').forEach(card => {
                    card.classList.remove('awaiting-equipment');
                });
                selectedEquipment = null;
            }
        });
    });
}

// Ekipmanın oyuncuya takılabilir olup olmadığını kontrol et
function canEquipToPlayer(category, playerPosition) {
    // Tüm ekipmanlar tüm pozisyonlara takılabilir
    return true;
    
    /* Eski pozisyon kontrollerini kaldırdık
    switch(category) {
        case 'shoes':
            return true;
        case 'kneepads':
            return ['PF', 'C'].includes(playerPosition);
        case 'jersey':
            return true;
        case 'wristband':
            return ['PG', 'SG', 'SF'].includes(playerPosition);
        case 'headband':
            return true;
        default:
            return false;
    }
    */
}

function initializeEquipmentSystem() {
    // Ekipman kartlarını oluştur
    Object.keys(equipmentData).forEach(category => {
        const grid = document.getElementById(`${category}-grid`);
        if (!grid) return;

        grid.innerHTML = ''; // Grid'i temizle
        
        equipmentData[category].forEach(item => {
            const card = createEquipmentCard(item, category);
            if (card) { // Sadece kart oluşturulduysa ekle
                grid.appendChild(card);
            }
        });
    });

    // Modal oluştur
    createPlayerSelectionModal();
}

function createEquipmentCard(item, category) {
    // Ekipmanın envanterde olup olmadığını kontrol et
    const isOwned = equipmentInventory[category] && 
                   equipmentInventory[category].some(eq => eq.id === item.id);
    
    // Eğer envanterde yoksa kart oluşturma
    if (!isOwned) return null;

    const card = document.createElement('div');
    card.className = `equipment-item ${item.rarity}`;
    card.setAttribute('data-id', item.id);
    card.setAttribute('data-type', category);
    
    // Envanterdeki ekipmanı bul ve seviyesini al
    const ownedItem = equipmentInventory[category].find(eq => eq.id === item.id);
    const upgradeLevel = ownedItem?.level || 0; // level kullanıyoruz, upgradeLevel değil
    
    // Güçlendirme bonusunu hesapla
    let totalOffenseBoost = item.boosts.offense || 0;
    let totalDefenseBoost = item.boosts.defense || 0;
    if (upgradeLevel > 0) {
        if (item.boosts.offense) totalOffenseBoost += upgradeLevel;
        if (item.boosts.defense) totalDefenseBoost += upgradeLevel;
    }

    // Ekipmanın kullanımda olup olmadığını kontrol et
    const isInUse = isEquipmentInUse(item.id, category);

    card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
            <h4>${item.name} ${upgradeLevel > 0 ? `+${upgradeLevel}` : ''}</h4>
            <p class="rarity-text">${item.rarity}</p>
            <p class="boost-text">
                ${totalOffenseBoost > 0 ? `+${totalOffenseBoost} Hücum` : ''}
                ${totalDefenseBoost > 0 ? `+${totalDefenseBoost} Savunma` : ''}
            </p>
            ${!isInUse ? '<button class="select-equipment-btn">Seç</button>' : 
                        '<span class="equipped-text">Kullanımda</span>'}
        </div>
    `;

    if (!isInUse) {
        card.draggable = true;
        
        // Seç butonuna tıklama olayı ekle
        const selectBtn = card.querySelector('.select-equipment-btn');
        selectBtn.addEventListener('click', () => showPlayerSelection(ownedItem, category)); // ownedItem'ı gönder

        // Sürükleme olaylarını ekle
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    }

    return card;
}

function createPlayerSelectionModal() {
    const modal = document.createElement('div');
    modal.className = 'player-selection-modal';
    modal.style.display = 'none';
    
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Oyuncu Seç</h3>
            <div class="players-grid"></div>
            <button class="close-modal">Kapat</button>
        </div>
    `;

    document.body.appendChild(modal);
    playerSelectionModal = modal;

    // Kapatma butonu olayı
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

function showPlayerSelection(equipment, category) {
    const playersGrid = playerSelectionModal.querySelector('.players-grid');
    playersGrid.innerHTML = '';

    // Uygun oyuncuları filtrele ve göster
    myTeam.forEach(player => {
        if (canEquipToPlayer(category, player.position)) {
            const playerCard = createPlayerSelectionCard(player, equipment, category);
            playersGrid.appendChild(playerCard);
        }
    });

    playerSelectionModal.style.display = 'flex';
}

function createPlayerSelectionCard(player, equipment, category) {
    const card = document.createElement('div');
    card.className = 'player-selection-card';
    
    card.innerHTML = `
        <img src="${player.image}" alt="${player.name}">
        <div class="player-info">
            <h4>${player.name}</h4>
            <p>${player.position}</p>
        </div>
    `;

    card.addEventListener('click', () => {
        equipItem(player.name, category, equipment);
        playerSelectionModal.style.display = 'none';
    });

    return card;
}

// Ekipmanın kullanımda olup olmadığını kontrol et
function isEquipmentInUse(equipmentId, category) {
    return myTeam.some(player => 
        player.equipment && 
        player.equipment[category] && 
        player.equipment[category].id === equipmentId
    );
}