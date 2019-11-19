import inquirer from 'inquirer'

export default function ({ printCommandsIndex, subcommand }) {
  return {
    name: 'docs',
    help: 'builds documentation of the application',
    command ({ _: args }) {
      const DocMain = {
        root: {
          command () {
            printCommandsIndex(DocMain.commands)
          }
        },
        commands: [
          {
            name: 'build',
            help: 'builds markdown documentation inside docs/',
            async command ({ _: args }) {
              // check for pleasure project
              // check configuration
              // ask for ip
              // ask for ports
              // ask for packages (actually, prompt a file where to set all of this up)
              const optionsRegex = /--(readme|ui|guide|api)/
              const prefixRegex = /^--/

              let toBuild = process
                .argv
                .filter(v => optionsRegex.test(v))
                .map(v => v.replace(/^--/, ''))

              if (toBuild.length === 0) {
                ({ toBuild } = await inquirer.prompt(
                  [
                    {
                      type: 'checkbox',
                      name: 'toBuild',
                      help: 'Type of documentation to build',
                      choices: [
                        {
                          name: 'README',
                          value: 'readme',
                          checked: true
                        },
                        {
                          name: 'UI',
                          value: 'ui',
                          checked: true
                        },
                        {
                          name: 'API',
                          value: 'api',
                          checked: true
                        },
                        {
                          name: 'Guide',
                          value: 'guide',
                          checked: true
                        }
                      ],
                      validate (v) {
                        return v.length > 0 ? true : 'Select at least one option'
                      }
                    }
                  ],
                  process.argv
                ))
              }
              const build = {}
              toBuild.forEach(b => {
                build[b] = true
              })

              if (build.ui) {
                // todo: build vue doc
              }

              process.exit(0)
            }
          },
          {
            name: 'serve',
            help: 'serves docs/ and parses its markdown files content',
            async command ({ _: args }) {
              // check for pleasure project
              // check configuration
              // ask for ip
              // ask for ports
              // ask for packages (actually, prompt a file where to set all of this up)
              const optionsRegex = /^--(readme|ui|guide|api)$/
              const prefixRegex = /^--/

              let toBuild = process
                .argv
                .filter(v => optionsRegex.test(v))
                .map(v => v.replace(/^--/, ''))

              if (toBuild.length === 0) {
                ({ toBuild } = await inquirer.prompt(
                  [
                    {
                      type: 'checkbox',
                      name: 'toBuild',
                      help: 'Type of documentation to build',
                      choices: [
                        {
                          name: 'README',
                          value: 'readme',
                          checked: true
                        },
                        {
                          name: 'UI',
                          value: 'ui',
                          checked: true
                        },
                        {
                          name: 'API',
                          value: 'api',
                          checked: true
                        },
                        {
                          name: 'Guide',
                          value: 'guide',
                          checked: true
                        }
                      ],
                      validate (v) {
                        return v.length > 0 ? true : 'Select at least one option'
                      }
                    }
                  ],
                  process.argv
                ))
              }
              const build = {}
              toBuild.forEach(b => {
                build[b] = true
              })

              if (build.ui) {
                /*
                todo: build vue docs... usage build --ui from to
                 - generate markdown file inside docs/ui.md
                 */
              }

              if (build.api) {
                /*
                todo: build vue doc
                 - generate markdown file inside docs/ui.md
                 */
              }

              if (build.guide) {
                /*
                todo: build vue doc
                 - generate markdown file inside docs/ui.md
                 */
              }

              if (build.readme) {
                /*
                todo: build readme index
                 - generate markdown file inside docs/ui.md
                 */
              }

              process.exit(0)
            }
          }
        ]
      }
      const match = subcommand(DocMain)
      match(args)
    }
  }
}
