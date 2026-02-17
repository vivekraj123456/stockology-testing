#!/bin/bash

# Stockology VPS Deployment Script
# Run this after SSH into server as luckyneo

echo "🚀 Starting Stockology Deployment..."

# 1. Update system
echo "📦 Updating system..."
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 20.x
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install Git
echo "📦 Installing Git..."
sudo apt install git -y

# 4. Install PM2
echo "📦 Installing PM2..."
sudo npm install -g pm2

# 5. Install Nginx
echo "📦 Installing Nginx..."
sudo apt install nginx -y

# 6. Create directory and clone repository
echo "📂 Cloning repository..."
sudo mkdir -p /var/www/stockology
cd /var/www/stockology
sudo git clone https://github.com/luckyneo12/new-stockology.git .

# 7. Set permissions
echo "🔐 Setting permissions..."
sudo chown -R luckyneo:luckyneo /var/www/stockology

# 8. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 9. Build application
echo "🔨 Building application..."
npm run build

# 10. Start with PM2
echo "🚀 Starting application..."
pm2 start npm --name "stockology" -- start
pm2 startup
pm2 save

# 11. Configure Nginx
echo "⚙️ Configuring Nginx..."
sudo tee /etc/nginx/sites-available/stockology > /dev/null <<EOF
server {
    listen 80;
    server_name stockology.in www.stockology.in 68.178.162.67;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/stockology /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 12. Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo "✅ Deployment Complete!"
echo ""
echo "🌐 Your website should be accessible at:"
echo "   - http://68.178.162.67"
echo "   - http://stockology.in (after DNS propagation)"
echo ""
echo "📊 Check status:"
echo "   pm2 status"
echo "   pm2 logs stockology"
echo ""
echo "🔒 To install SSL certificate, run:"
echo "   sudo apt install certbot python3-certbot-nginx -y"
echo "   sudo certbot --nginx -d stockology.in -d www.stockology.in"
