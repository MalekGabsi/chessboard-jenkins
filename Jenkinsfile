pipeline {
  agent none

  environment {
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1"
  }

  stages {

    stage('Install & Build') {
      agent {
        docker {
          image 'mcr.microsoft.com/playwright:v1.58.0-noble'
          args '--network=host'
        }
      }
      steps {
        sh 'npm ci'
        sh 'npm run build'
      }
    }

    stage('UI Tests (Playwright)') {
      agent {
        docker {
          image 'mcr.microsoft.com/playwright:v1.58.0-noble'
          args '--network=host'
        }
      }
      steps {
        sh 'npm run test:e2e'
      }
      post {
        always {
          publishHTML([
            allowMissing: true,
            alwaysLinkToLastBuild: false,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'PlaywrightReport',
            useWrapperFileDirectly: true
          ])
        }
      }
    }

    // 🚀 DEPLOY ONLY ON MAIN
    stage('Deploy') {
      when {
        branch 'main'
      }
      agent {
        docker {
          image 'node:20-alpine'
        }
      }
      steps {
        echo "Deploying application (main branch only)"
        sh 'npm run build'
        // exemple :
        // sh 'docker compose up -d'
        // sh 'scp -r dist user@server:/var/www/html'
      }
    }
  }
}
