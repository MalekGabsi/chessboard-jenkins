pipeline {
  agent none

  environment {
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1"
    NETLIFY_AUTH_TOKEN = credentials('NETLIFY_TOKEN')
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
        sh 'npm ci'
        sh 'npm run build'
        sh 'npx netlify deploy --prod --dir=dist --site 3c8adef6-ba3b-444f-a8ae-250c4f1dbb27 --auth $NETLIFY_AUTH_TOKEN --skip-functions'

      }
    }
  }
}
