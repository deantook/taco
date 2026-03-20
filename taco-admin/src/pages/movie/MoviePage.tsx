import { useCallback, useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { ApiError } from '../../api/client'
import * as movieApi from '../../api/movie'
import { CreditsEditor } from '../../components/credits/CreditsEditor'
import { ListPagination } from '../../components/crud/ListPagination'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { dateInputToIsoUtc, formatDisplayDate, toDateInputValue } from '../../lib/date'
import { parseOptionalJson } from '../../lib/json'
import { parseIntOptional } from '../../lib/number'
import type { Movie, PagePayload } from '../../types/api'

export function MoviePage() {
  const [current, setCurrent] = useState(1)
  const [size, setSize] = useState(10)
  const [payload, setPayload] = useState<PagePayload<Movie> | null>(null)
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState<string | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [originalTitle, setOriginalTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [country, setCountry] = useState('')
  const [language, setLanguage] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [metadataText, setMetadataText] = useState('')
  const [editId, setEditId] = useState<number | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setListError(null)
    try {
      const data = await movieApi.fetchMoviePage(current, size)
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

  function resetForm() {
    setTitle('')
    setOriginalTitle('')
    setDescription('')
    setDuration('')
    setReleaseDate('')
    setCountry('')
    setLanguage('')
    setCoverUrl('')
    setMetadataText('')
    setFormError(null)
  }

  function openCreate() {
    setMode('create')
    setEditId(null)
    resetForm()
    setModalOpen(true)
  }

  function openEdit(row: Movie) {
    if (row.id == null) {
      return
    }
    setMode('edit')
    setEditId(row.id)
    setTitle(row.title ?? '')
    setOriginalTitle(row.originalTitle ?? '')
    setDescription(row.description ?? '')
    setDuration(row.duration != null ? String(row.duration) : '')
    setReleaseDate(toDateInputValue(row.releaseDate))
    setCountry(row.country ?? '')
    setLanguage(row.language ?? '')
    setCoverUrl(row.coverUrl ?? '')
    setMetadataText(
      row.metadata != null ? JSON.stringify(row.metadata, null, 2) : ''
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
    if (!title.trim()) {
      setFormError('请填写标题')
      return
    }
    let metadata: unknown = null
    try {
      if (metadataText.trim()) {
        metadata = parseOptionalJson(metadataText)
      }
    } catch {
      setFormError('扩展信息（JSON）格式不正确')
      return
    }

    const body: Partial<Movie> = {
      id: mode === 'edit' ? editId : null,
      title: title.trim() || null,
      originalTitle: originalTitle.trim() || null,
      description: description.trim() || null,
      duration: parseIntOptional(duration),
      releaseDate: dateInputToIsoUtc(releaseDate),
      country: country.trim() || null,
      language: language.trim() || null,
      coverUrl: coverUrl.trim() || null,
      metadata,
    }

    setSaving(true)
    setFormError(null)
    try {
      if (mode === 'create') {
        delete body.id
        await movieApi.createMovie(body)
      } else if (editId != null) {
        await movieApi.updateMovie(editId, body)
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
    if (!window.confirm('确定删除该电影？')) {
      return
    }
    try {
      await movieApi.deleteMovie(id)
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
          新建电影
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
                    标题
                  </th>
                  <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
                    原名
                  </th>
                  <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
                    封面
                  </th>
                  <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
                    时长
                  </th>
                  <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
                    上映
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
                      <td className="max-w-[160px] truncate px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                        {row.title ?? '—'}
                      </td>
                      <td className="max-w-[120px] truncate px-4 py-3 text-neutral-600 dark:text-neutral-300">
                        {row.originalTitle ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        {row.coverUrl ? (
                          <img
                            src={row.coverUrl}
                            alt=""
                            className="h-10 w-7 rounded object-cover ring-1 ring-black/8 dark:ring-white/10"
                          />
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">
                        {row.duration != null ? `${row.duration} 分` : '—'}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-neutral-600 dark:text-neutral-300">
                        {formatDisplayDate(row.releaseDate)}
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

      <ListPagination
        total={payload?.total ?? 0}
        current={current}
        size={size}
        totalPages={totalPages}
        onCurrentChange={setCurrent}
        onSizeChange={setSize}
      />

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          role="presentation"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <Card className="max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6 shadow-xl">
            <h2 className="mb-4 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {mode === 'create' ? '新建电影' : '编辑电影'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  标题 <span className="text-red-500">*</span>
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  原始名称
                </label>
                <Input
                  value={originalTitle}
                  onChange={(e) => setOriginalTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  简介
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  时长（分钟）
                </label>
                <Input
                  inputMode="numeric"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  上映日期
                </label>
                <Input
                  type="date"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  国家/地区
                </label>
                <Input value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  语言
                </label>
                <Input
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  封面 URL
                </label>
                <Input
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="https://"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  扩展信息（JSON，可选）
                </label>
                <Textarea
                  value={metadataText}
                  onChange={(e) => setMetadataText(e.target.value)}
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
            <CreditsEditor
              contentType="movie"
              contentId={mode === 'edit' ? editId : null}
            />
          </Card>
        </div>
      ) : null}
    </div>
  )
}
