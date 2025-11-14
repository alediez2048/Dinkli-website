# Connecting Your GoDaddy Domain to GitHub Pages

Follow these steps to connect your GoDaddy domain to your Dinkli website:

## Step 1: Add Custom Domain in GitHub

1. Go to your repository: https://github.com/alediez2048/Dinkli-website
2. Click on **Settings** → **Pages** (in the left sidebar)
3. Under **Custom domain**, enter your domain (e.g., `www.yourdomain.com` or `yourdomain.com`)
4. Click **Save**
5. GitHub will show you DNS records you need to add

## Step 2: Configure DNS in GoDaddy

### Option A: Using CNAME (Recommended for www subdomain)

If you want to use `www.yourdomain.com`:

1. Log in to your GoDaddy account
2. Go to **My Products** → **DNS** (or **Domain Manager**)
3. Find your domain and click **DNS** or **Manage DNS**
4. Add a new **CNAME** record:
   - **Name/Host**: `www`
   - **Value/Points to**: `alediez2048.github.io`
   - **TTL**: 600 (or default)

### Option B: Using A Records (For root domain)

If you want to use `yourdomain.com` (without www):

1. In GoDaddy DNS settings, add **A** records pointing to GitHub Pages IPs:
   - **Name/Host**: `@` (or leave blank)
   - **Value/Points to**: `185.199.108.153`
   - **TTL**: 600
   
   Add 3 more A records with these IPs:
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

### Option C: Using Both (Recommended)

For both `yourdomain.com` AND `www.yourdomain.com`:

1. Add A records for root domain (as shown in Option B)
2. Add CNAME record for www (as shown in Option A)

## Step 3: Wait for DNS Propagation

- DNS changes can take 24-48 hours to propagate, but usually happen within a few hours
- You can check propagation status at: https://www.whatsmydns.net/

## Step 4: Enable HTTPS (Automatic)

GitHub Pages will automatically provision an SSL certificate for your custom domain once DNS is properly configured. This usually happens within 24 hours.

## Step 5: Verify Setup

1. After DNS propagates, visit your domain in a browser
2. You should see your Dinkli website
3. Check that HTTPS is working (the lock icon in the browser)

## Troubleshooting

- **Domain not working?** Wait a few hours for DNS propagation
- **HTTPS not working?** It can take up to 24 hours for GitHub to provision SSL
- **Still having issues?** Check that your DNS records are correct in GoDaddy

## Current GitHub Pages URL

Your site is currently available at: https://alediez2048.github.io/Dinkli-website/

Once you add your custom domain, both URLs will work!

