// NYURAT Application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Sidebar navigation
    setupSidebarNavigation();
    
    // Search functionality
    setupSearch();
    
    // Table interactions
    setupTableInteractions();
    
    // Notification system
    setupNotifications();
    
    // User menu
    setupUserMenu();
}

function setupSidebarNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => {
                l.classList.remove('bg-blue-50', 'text-blue-600');
                l.classList.add('text-gray-700');
            });
            
            // Add active class to clicked link
            this.classList.remove('text-gray-700');
            this.classList.add('bg-blue-50', 'text-blue-600');
            
            // Here you would typically load the corresponding page content
            const pageName = this.querySelector('span').textContent;
            console.log('Navigating to:', pageName);
        });
    });
}

function setupSearch() {
    const searchInput = document.querySelector('input[type="text"]');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            
            // Filter table rows based on search query
            const tableRows = document.querySelectorAll('tbody tr');
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(query) ? '' : 'none';
            });
        });
        
        // Clear search on Escape key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                const tableRows = document.querySelectorAll('tbody tr');
                tableRows.forEach(row => row.style.display = '');
            }
        });
    }
}

function setupTableInteractions() {
    // View button functionality
    const viewButtons = document.querySelectorAll('.fa-eye').forEach(icon => {
        icon.parentElement.addEventListener('click', function() {
            const row = this.closest('tr');
            const letterNumber = row.cells[0].textContent;
            const subject = row.cells[1].textContent;
            
            // Show modal or navigate to detail page
            showLetterDetail(letterNumber, subject);
        });
    });
    
    // Download button functionality
    const downloadButtons = document.querySelectorAll('.fa-download').forEach(icon => {
        icon.parentElement.addEventListener('click', function() {
            const row = this.closest('tr');
            const letterNumber = row.cells[0].textContent;
            
            // Simulate download
            downloadLetter(letterNumber);
        });
    });
}

function setupNotifications() {
    const notificationButton = document.querySelector('.fa-bell');
    
    if (notificationButton) {
        notificationButton.addEventListener('click', function() {
            // Toggle notification dropdown
            showNotifications();
        });
    }
}

function setupUserMenu() {
    const userProfile = document.querySelector('.flex.items-center.space-x-3');
    
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // Toggle user menu dropdown
            showUserMenu();
        });
    }
}

function showLetterDetail(letterNumber, subject) {
    // Create and show modal for letter details
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold">Detail Surat</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-4">
                <div>
                    <label class="text-sm font-medium text-gray-500">No. Surat</label>
                    <p class="text-gray-900">${letterNumber}</p>
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-500">Perihal</label>
                    <p class="text-gray-900">${subject}</p>
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-500">Konten</label>
                    <p class="text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
            <div class="mt-6 flex justify-end space-x-3">
                <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 border rounded-lg hover:bg-gray-50">
                    Tutup
                </button>
                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Download
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function downloadLetter(letterNumber) {
    // Simulate file download
    console.log('Downloading letter:', letterNumber);
    
    // Show success message
    showNotification('Surat berhasil diunduh', 'success');
}

function showNotifications() {
    // Create notification dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50';
    dropdown.innerHTML = `
        <div class="p-4 border-b">
            <h3 class="font-semibold">Notifikasi</h3>
        </div>
        <div class="max-h-96 overflow-y-auto">
            <div class="p-4 border-b hover:bg-gray-50 cursor-pointer">
                <div class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div class="flex-1">
                        <p class="text-sm font-medium">Surat baru masuk</p>
                        <p class="text-xs text-gray-500">2 menit yang lalu</p>
                    </div>
                </div>
            </div>
            <div class="p-4 border-b hover:bg-gray-50 cursor-pointer">
                <div class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div class="flex-1">
                        <p class="text-sm font-medium">Surat disposisi selesai</p>
                        <p class="text-xs text-gray-500">1 jam yang lalu</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Position dropdown relative to notification button
    const notificationButton = document.querySelector('.fa-bell').closest('button');
    const rect = notificationButton.getBoundingClientRect();
    dropdown.style.top = rect.bottom + 'px';
    dropdown.style.right = (window.innerWidth - rect.right) + 'px';
    
    document.body.appendChild(dropdown);
    
    // Close dropdown when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeDropdown(e) {
            if (!dropdown.contains(e.target) && e.target !== notificationButton) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        });
    }, 100);
}

function showUserMenu() {
    // Create user menu dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50';
    dropdown.innerHTML = `
        <div class="py-2">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Pengaturan</a>
            <hr class="my-2">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Keluar</a>
        </div>
    `;
    
    // Position dropdown relative to user profile
    const userProfile = document.querySelector('.flex.items-center.space-x-3');
    const rect = userProfile.getBoundingClientRect();
    dropdown.style.top = rect.bottom + 'px';
    dropdown.style.right = (window.innerWidth - rect.right) + 'px';
    
    document.body.appendChild(dropdown);
    
    // Close dropdown when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeDropdown(e) {
            if (!dropdown.contains(e.target) && !userProfile.contains(e.target)) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        });
    }, 100);
}

function showNotification(message, type = 'info') {
    // Create notification toast
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+K for search focus
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        document.querySelector('input[type="text"]').focus();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.fixed.inset-0');
        modals.forEach(modal => modal.remove());
    }
});