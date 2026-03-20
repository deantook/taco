import { useCallback, useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { ApiError } from '../../api/client'
import * as personApi from '../../api/person'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { formatDisplayDate, toDateInputValue } from '../../lib/date'
import type { PagePayload, Person } from '../../types/api'

function parseAliasesJson(text: string): unknown {
  const t = text.trim()
  if (!t) {
    return null
  }
  return JSON.parse(t) as unknown
}

function buildPersonBody(
  fields: {
    name: string
    originalName: string
    avatar: string
    bio: string
    birthDate: string
    aliasesText: string
  },
  id: number | null
): Partial<Person> {
  let aliases: unknown = null
  if (fields.aliasesText.trim()) {
    aliases = parseAliasesJson(fields.aliasesText)
  }
  const body: Partial<Person> = {
    id,
    name: fields.name.trim() || null,
    originalName: fields.originalName.trim() || null,
    avatar: fields.avatar.trim() || null,
    bio: fields.bio.trim() || null,
    aliases,
    birthDate: fields.birthDate
      ? `${fields.birthDate}T00:00:00.000Z`
      : null,
  }
  return body
}

export function PersonPage() {
  const [current, setCurrent] = useState(1)
  const [size, setSize] = useState(10)
  const [payload, setPayload] = useState<PagePayload<Person> | null>(null)
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState<string | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [originalName, setOriginalName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [bio, setBio] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [aliasesText, setAliasesText] = useState('')
  const [editId, setEditId] = useState<number | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setListError(null)
    try {
      const data = await personApi.fetchPersonPage(current, size)
      setPayload(data)
    } catch (e) {
      setListError(e instanceof ApiError ? e.message : '加载失败')
      setPayload(null)
    } finally {
      setLoading(false)
    }
  }, [current, size])

  useEffect(() => {
    void load()
  }, [load])

  function openCreate() {
    setMode('create')
    setEditId(null)
    setName('')
    setOriginalName('')
    setAvatar('')
    setBio('')
    setBirthDate('')
    setAliasesText('')
    setFormError(null)
    setModalOpen(true)
  }

  function openEdit(row: Person) {
    if (row.id == null) {
      return
    }
    setMode('edit')
    setEditId(row.id)
    setName(row.name ?? '')
    setOriginalName(row.originalName ?? '')
    setAvatar(row.avatar ?? '')
    setBio(row.bio ?? '')
    setBirthDate(toDateInputValue(row.birthDate))
    setAliasesText(
      row.aliases != null ? JSON.stringify(row.aliases, null, 2) : ''
    )
    setFormError(null)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setFormError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setFormError('请填写姓名')
      return
    }
    try {
      if (aliasesText.trim()) {
        parseAliasesJson(aliasesText)
      }
    } catch {
      setFormError('别名（JSON）格式不正确')
      return
    }

    setSaving(true)
    setFormError(null)
    try {
      const body = buildPersonBody(
        {
          name,
          originalName,
          avatar,
          bio,
          birthDate,
          aliasesText,
        },
        mode === 'edit' ? editId : null
      )
      if (mode === 'create') {
        delete body.id
        await personApi.createPerson(body)
      } else if (editId != null) {
        await personApi.updatePerson(editId, body)
      }
      closeModal()
      await load()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : '保存失败')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('确定删除该人物？')) {
      return
    }
    try {
      await personApi.deletePerson(id)
      await load()
    } catch (e) {
      window.alert(e instanceof ApiError ? e.message : '删除失败')
    }
  }

  const totalPages = payload ? Math.max(1, Number(payload.pages)) : 1

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          共 {payload?.total ?? 0} 条
        </p>
        <Button variant="primary" type="button" onClick={openCreate}>
          <Plus className="size-4" strokeWidth={1.75} />
          新建人物
        </Button>
      </div>

      <Card className="overflow-hidden">
        {listError ? (
          <p className="p-6 text-sm text-red-600 dark:text-red-400">
            {listError}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-black/8 bg-neutral-50/80 dark:border-white/10 dark:bg-white/5">
                  <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
                    ID
                  </th>
                  <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
                    姓名
                  </th>
                  <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
                    原名
                  </th>
                  <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
                    头像
                  </th>
                  <th className="hidden max-w-[200px] px-4 py-3 font-medium text-neutral-600 md:table-cell dark:text-neutral-400">
                    简介
                  </th>
                  <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
                    出生日期
                  </th>
                  <th className="w-32 px-4 py-3 text-right font-medium text-neutral-600 dark:text-neutral-400">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-neutral-500"
                    >
                      加载中…
                    </td>
                  </tr>
                ) : !payload?.records.length ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-neutral-500"
                    >
                      暂无数据
                    </td>
                  </tr>
                ) : (
                  payload.records.map((row, idx) => (
                    <tr
                      key={row.id != null ? String(row.id) : `row-${idx}`}
                      className="border-b border-black/6 last:border-0 dark:border-white/6"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-neutral-500">
                        {row.id ?? '—'}
                      </td>
                      <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                        {row.name ?? '—'}
                      </td>
                      <td className="max-w-[140px] truncate px-4 py-3 text-neutral-600 dark:text-neutral-300">
                        {row.originalName ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        {row.avatar ? (
                          <img
                            src={row.avatar}
                            alt=""
                            className="size-8 rounded-full object-cover ring-1 ring-black/8 dark:ring-white/10"
                          />
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )}
                      </td>
                      <td className="hidden max-w-[200px] truncate px-4 py-3 text-neutral-500 md:table-cell">
                        {row.bio ?? '—'}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-neutral-600 dark:text-neutral-300">
                        {formatDisplayDate(row.birthDate)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            type="button"
                            className="size-8 p-0"
                            onClick={() => openEdit(row)}
                            disabled={row.id == null}
                            aria-label="编辑"
                          >
                            <Pencil className="size-4" strokeWidth={1.75} />
                          </Button>
                          <Button
                            variant="ghost"
                            type="button"
                            className="size-8 p-0 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                            onClick={() => row.id != null && handleDelete(row.id)}
                            disabled={row.id == null}
                            aria-label="删除"
                          >
                            <Trash2 className="size-4" strokeWidth={1.75} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {payload && payload.total > 0 ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span>每页</span>
            <select
              value={size}
              onChange={(e) => {
                setSize(Number(e.target.value))
                setCurrent(1)
              }}
              className="rounded-[var(--radius-panel)] border border-black/8 bg-white px-2 py-1 text-sm dark:border-white/10 dark:bg-neutral-950"
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              type="button"
              disabled={current <= 1}
              onClick={() => setCurrent((c) => Math.max(1, c - 1))}
            >
              上一页
            </Button>
            <span>
              {current} / {totalPages}
            </span>
            <Button
              variant="secondary"
              type="button"
              disabled={current >= totalPages}
              onClick={() =>
                setCurrent((c) => (c < totalPages ? c + 1 : c))
              }
            >
              下一页
            </Button>
          </div>
        </div>
      ) : null}

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          role="presentation"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <Card className="max-h-[90vh] w-full max-w-lg overflow-y-auto p-6 shadow-xl">
            <h2 className="mb-4 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {mode === 'create' ? '新建人物' : '编辑人物'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  姓名 <span className="text-red-500">*</span>
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  原名
                </label>
                <Input
                  value={originalName}
                  onChange={(e) => setOriginalName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  头像 URL
                </label>
                <Input
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  简介
                </label>
                <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  出生日期
                </label>
                <Input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  别名（JSON 数组，可选）
                </label>
                <Textarea
                  value={aliasesText}
                  onChange={(e) => setAliasesText(e.target.value)}
                  placeholder='例如 ["别名A","Alias B"]'
                  rows={3}
                />
              </div>
              {formError ? (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {formError}
                </p>
              ) : null}
              <div className="mt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={closeModal}
                  disabled={saving}
                >
                  取消
                </Button>
                <Button type="submit" variant="primary" disabled={saving}>
                  {saving ? '保存中…' : '保存'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      ) : null}
    </div>
  )
}
